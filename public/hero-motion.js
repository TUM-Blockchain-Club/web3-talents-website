// A small displacement field, not a whole-image transform. The source image
// remains visible until the texture and shaders are ready, and on any failure.
export const motionQuery = '(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export function pointerPosition(event, bounds) {
    return [(event.clientX - bounds.left) / bounds.width, 1 - (event.clientY - bounds.top) / bounds.height];
}

export function settle(current, target, milliseconds) {
    return current + (target - current) * (1 - Math.exp(-milliseconds / 110));
}

export const fragmentSource = `
precision mediump float;
varying vec2 uv;
uniform sampler2D artwork;
uniform vec2 pointer;
uniform float aspect;
uniform float radius;
uniform float strength;
uniform float time;
void main() {
    vec2 delta = (uv - pointer) * vec2(aspect, 1.0);
    float distance = length(delta);
    vec2 sampleUV = uv;
    // Pixels outside this circle are sampled at their original coordinates.
    if (distance < radius && strength > 0.0) {
        float falloff = (1.0 - smoothstep(0.0, radius, distance))
            * smoothstep(0.0, radius * 0.25, distance);
        vec2 direction = delta / max(distance, 0.0001);
        vec2 tangent = vec2(-direction.y, direction.x);
        float wave = sin(distance / radius * 9.0 - time * 2.0);
        vec2 offset = (direction * 0.19 + tangent * wave * 0.07)
            * radius * falloff * strength;
        sampleUV -= offset / vec2(aspect, 1.0);
    }
    gl_FragColor = texture2D(artwork, clamp(sampleUV, 0.0, 1.0));
}`;

export function createRenderer(canvas, image) {
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false });
    if (!gl) return null;
    const shaders = [];
    const compile = (type, source) => {
        const shader = gl.createShader(type);
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Shader unavailable');
        return shader;
    };
    const program = gl.createProgram();
    let buffer, texture;
    const dispose = () => {
        if (buffer) gl.deleteBuffer(buffer);
        if (texture) gl.deleteTexture(texture);
        shaders.forEach(shader => gl.deleteShader(shader));
        gl.deleteProgram(program);
    };
    try {
        gl.attachShader(program, compile(gl.VERTEX_SHADER, `
            attribute vec2 position;
            varying vec2 uv;
            void main() { uv = (position + 1.0) * 0.5; gl_Position = vec4(position, 0.0, 1.0); }
        `));
        gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Program unavailable');
        gl.useProgram(program);
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.uniform1i(gl.getUniformLocation(program, 'artwork'), 0);
        const uniforms = Object.fromEntries(['pointer', 'aspect', 'radius', 'strength', 'time'].map(name => [name, gl.getUniformLocation(program, name)]));
        return {
            dispose,
            draw(bounds, point, strength, time) {
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.uniform2f(uniforms.pointer, point[0], point[1]);
                gl.uniform1f(uniforms.aspect, bounds.width / bounds.height);
                gl.uniform1f(uniforms.radius, 105 / bounds.height);
                gl.uniform1f(uniforms.strength, strength);
                gl.uniform1f(uniforms.time, time / 1000);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            },
        };
    } catch {
        dispose();
        return null;
    }
}

export function initHero(art) {
    const media = window.matchMedia(motionQuery);
    let cleanup;
    const configure = () => {
        cleanup?.();
        cleanup = null;
        if (!media.matches) return;
        let cancelled = false, frame = 0, active = false, strength = 0, last = 0;
        let point = [.75, .5], bounds, renderer, observer;
        const canvas = document.createElement('canvas');
        canvas.className = 'web3t-hero__distortion';
        const hit = document.createElement('span');
        hit.className = 'web3t-hero__art-hit';
        const hide = () => {
            active = false;
            strength = 0;
            cancelAnimationFrame(frame);
            frame = 0;
            art.classList.remove('is-distorting');
        };
        const tick = time => {
            frame = 0;
            strength = settle(strength, active ? 1 : 0, Math.min(time - last || 16, 50));
            last = time;
            if (!active && strength < .002) { hide(); return; }
            renderer.draw(bounds, point, strength, time);
            art.classList.add('is-distorting');
            frame = requestAnimationFrame(tick);
        };
        const move = event => {
            if (!renderer || cancelled || !media.matches) return;
            bounds = art.getBoundingClientRect();
            point = pointerPosition(event, bounds);
            active = true;
            if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
        };
        const leave = () => { active = false; };
        const visibility = () => { if (document.hidden) hide(); };
        hit.addEventListener('pointerenter', move);
        hit.addEventListener('pointermove', move);
        hit.addEventListener('pointerleave', leave);
        hit.addEventListener('pointercancel', leave);
        canvas.addEventListener('webglcontextlost', () => { cancelled = true; hide(); });
        window.addEventListener('blur', hide);
        document.addEventListener('visibilitychange', visibility);
        const image = new Image();
        image.onload = () => {
            if (cancelled) return;
            renderer = createRenderer(canvas, image);
            if (!renderer) return;
            art.append(canvas, hit);
            const resize = () => {
                hide();
                bounds = art.getBoundingClientRect();
                const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
                canvas.width = Math.round(bounds.width * ratio);
                canvas.height = Math.round(bounds.height * ratio);
            };
            observer = new ResizeObserver(resize);
            observer.observe(art);
            resize();
        };
        image.src = '/assets/hero-bg.png';
        cleanup = () => {
            cancelled = true;
            hide();
            observer?.disconnect();
            renderer?.dispose();
            canvas.remove();
            hit.remove();
            window.removeEventListener('blur', hide);
            document.removeEventListener('visibilitychange', visibility);
        };
    };
    media.addEventListener('change', configure);
    configure();
    return () => { cleanup?.(); media.removeEventListener('change', configure); };
}

if (typeof document !== 'undefined') {
    const art = document.querySelector('[data-hero-art]');
    if (art) initHero(art);
}
