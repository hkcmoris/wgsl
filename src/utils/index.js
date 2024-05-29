import * as THREE from 'three';

// Exported functions, variables, or classes go here

function getQuadVertices(i, w, h) {
    let b = Math.floor(i / w) + i;
    return [
        b,
        b + 1,
        b + w + 2,
        b,
        b + w + 2,
        b + w + 1
    ]
}

// Example function
export function generatePlaneGeometry(position, width, height, widthSegments, heightSegments) {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array((widthSegments + 1) * (heightSegments + 1) * 3);
    const indices = [];
    const uv0 = new Float32Array((widthSegments + 1) * (heightSegments + 1) * 2);

    for (let y = 0; y <= heightSegments; y++) {
        for (let x = 0; x <= widthSegments; x++) {
            const index = (x + y * (widthSegments + 1));

            vertices[index * 3] = position.x - (width / 2) + (width / widthSegments) * x;
            vertices[index * 3 + 1] = position.y - (height / 2) + (height / heightSegments) * y;
            vertices[index * 3 + 2] = position.z;

            //console.log(`v(${index},${widthSegments},${heightSegments}) = [${vertices[index * 3]},${vertices[index * 3 + 1]},${vertices[index * 3 + 2]}]`);
        }
    }

    for (let y = 0; y <= heightSegments; y++) {
        for (let x = 0; x <= widthSegments; x++) {
            const u = x / widthSegments; // 0-1
            const v = y / heightSegments; // 0-1
            const index = (x + y * (widthSegments + 1));

            uv0[index * 2] = u;
            uv0[index * 2 + 1] = v;

            indices.push(...getQuadVertices(index, widthSegments, heightSegments));

            //console.log(`f(${index},${widthSegments},${heightSegments}) = [${getQuadVertices(index, widthSegments, heightSegments).join(',')}]`);
        }
    }

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3, false));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uv0, 2, false));
    
    return geometry;
}

// Default export (only one per module)
export default {
    generatePlaneGeometry
};