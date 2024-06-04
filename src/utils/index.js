import * as THREE from 'three';

// Exported functions, variables, or classes go here

/**
 * Returns the vertices of a quad in counter-clockwise order.
 * @param {} i The index.
 * @param w The number of segments in the x-axis.
 * @returns 
 */
function quadIndicesCCW(i, w) {
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

/**
 * Returns the indices of a quad in clockwise order.
 * @param i The index.
 * @param w The number of segments in the x-axis.
 * @returns 
 */
function quadIndicesCW(i, w) {
    let b = Math.floor(i / w) + i;
    return [
        b,
        b + w + 1,
        b + w + 2,
        b,
        b + w + 2,
        b + 1
    ]
}

/**
 * Custom plane geometry class.
 */
export class DG_Plane {
    
    /**
     * Custom plane geometry class.
     * @param position The position of the plane.
     * @param origin The origin of the plane.
     * @param scale The scale of the plane.
     * @param segments The number of segments of the plane.
     */
    constructor(position, origin, scale, segments) {
        this.position = position;
        this.origin = origin;
        this.scale = scale;
        this.segments = segments;
        this.geometry = new THREE.BufferGeometry();
        this.vertices = new Float32Array((segments.x + 1) * (segments.y + 1) * 3);
        this.normals = new Float32Array((segments.x + 1) * (segments.y + 1) * 3);
        this.indices = [/*segments.x * segments.y * 6*/];
        this.uv0 = new Float32Array((segments.x + 1) * (segments.y + 1) * 2);
        this.uv1 = new Float32Array((segments.x + 1) * (segments.y + 1) * 2);
        this.chunk = new THREE.Vector2(scale.x / segments.x, scale.y / segments.y);

        this.generateVertices();
        this.generateIndices();
        // this.indices.push(...quadIndicesCW(5, segments.x, segments.y));
        // this.indices.push(...quadIndicesCW(0, segments.x, segments.y));

        // console.log(`i(${5},${this.segments.x},${this.segments.y}) = [${getQuadVertices(5, this.segments.x, this.segments.y).join(',')}]`);

        this.geometry.setIndex(this.indices);
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.vertices, 3, false));
        this.geometry.setAttribute('normal', new THREE.BufferAttribute(this.normals, 3, false));
        this.geometry.setAttribute('uv', new THREE.BufferAttribute(this.uv0, 2, false));
        console.log('DG_Plane generated');
    }

    generateWireframe() {
        let wireframe = new THREE.WireframeGeometry( this.geometry );
        let line = new THREE.LineSegments( wireframe );
        line.material.color.setHex(0xff00ff);
        return line;
    }

    generateVertices() {
        for (let y = 0; y <= this.segments.y; y++) {
            for (let x = 0; x <= this.segments.x; x++) {
                const index = (x + y * (this.segments.x + 1));
    
                this.vertices[index * 3] = this.position.x - this.origin.x + this.chunk.x * x;
                this.vertices[index * 3 + 1] = this.position.y - this.origin.y;
                this.vertices[index * 3 + 2] = this.position.z + this.origin.z - this.chunk.y * y;
    
                this.normals[index * 3] = 0;
                this.normals[index * 3 + 1] = 1;
                this.normals[index * 3 + 2] = 0;

                //console.log(`v(${index},${this.segments.x},${this.segments.y}) = [${this.vertices[index * 3]},${this.vertices[index * 3 + 1]},${this.vertices[index * 3 + 2]}]`);

                const u = x / this.segments.x; // 0-1
                const v = y / this.segments.y; // 0-1
                this.uv0[index * 2] = u;
                this.uv0[index * 2 + 1] = v;
                this.uv1[index * 2] = x;
                this.uv1[index * 2 + 1] = y;
            }
        }
    }

    generateIndices() {
        for (let y = 0; y < this.segments.y; y++) {
            for (let x = 0; x < this.segments.x; x++) {
                const index = (x + y * (this.segments.x));
    
                this.indices.push(...quadIndicesCCW(index, this.segments.x, this.segments.y));
    
                //console.log(`i(${index},${this.segments.x},${this.segments.y}) = [${quadIndicesCCW(index, this.segments.x, this.segments.y).join(',')}]`);
            }
        }
    }
}

// Default export (only one per module)
export default {
    DG_Plane
};