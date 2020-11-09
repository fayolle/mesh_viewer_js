"use strict";

class Face {
    constructor(v0, v1, v2) {
	this.v0 = v0;
	this.v1 = v1;
	this.v2 = v2;
    }
}


class Edge {
    constructor(v0, v1) {
	this.v0 = v0;
	this.v1 = v1;
    }
    
    equal(v0, v1) {
	return (this.v0==v0 && this.v1==v1) || (this.v0==v1 && this.v1==v0);
    }
}


class Mesh {
    constructor() {
	this.vertices = [];
	this.faces = [];
	this.boundaryEdges = [];
    }
    
    build(positions, indices) {
	this.preallocate(positions, indices);
	
	for (let i=0; i<this.vertices.length; i++) {
	    let p = positions[i];
	    this.vertices[i] = new Vector(p.x, p.y, p.z);
	}
	
	for (let i=0; i<this.faces.length; i++) {
	    let v0 = indices[3*i+0];
	    let v1 = indices[3*i+1];
	    let v2 = indices[3*i+2];
	    this.faces[i] = new Face(v0,v1,v2);
	}
    }
    
    preallocate(positions, indices) {
	let nVertices = positions.length;
	let nFaces = indices.length / 3;
	
	// clear arrays
	this.vertices.length = 0;
	this.faces.length = 0;
	
	// allocate space
	this.vertices = new Array(nVertices);
	this.faces = new Array(nFaces);
    }

    // count number of tris containing (a,b) as an edge
    countAdjacentTri(e) {
	let count = 0;
	for (let i=0; i<this.faces.length; i++) {
	    let f = this.faces[i];
	    let v0 = f.v0;
	    let v1 = f.v1;
	    let v2 = f.v2;

	    if (e.equal(v0,v1)) count++;
	    if (e.equal(v1,v2)) count++;
	    if (e.equal(v2,v0)) count++;
	}
	return count;
    }

    computeBoundaryEdges() {
	// visit each edge
	for (let i=0; i<this.faces.length; i++) {
	    let f = this.faces[i];
	    let v0 = f.v0;
	    let v1 = f.v1;
	    let v2 = f.v2;
	    
	    // edge1
	    let e1 = new Edge(v0,v1);
	    let count = this.countAdjacentTri(e1);
	    if (count == 1) 
		this.boundaryEdges.push(e1);

	    // edge2
	    let e2 = new Edge(v1,v2);
	    count = this.countAdjacentTri(e2);
	    if (count == 1)
		this.boundaryEdges.push(e2);
	    
	    // edge3
	    let e3 = new Edge(v2,v0);
	    count = this.countAdjacentTri(e3);
	    if (count == 1)
		this.boundaryEdges.push(e3);
	}
    }

    orderBoundaryEdges() {
    
    }
}

