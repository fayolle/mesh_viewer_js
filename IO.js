"use strict";

function readOBJ(input) {
    let lines = input.split("\n");
    let positions = [];
    let indices = [];

    for (let line of lines) {
	line = line.trim();
	let tokens = line.split(" ");
	let identifier = tokens[0].trim();

	if (identifier === "v") {
	    positions.push(new Vector(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3])));

	} else if (identifier === "f") {
	    if (tokens.length > 4) {
		alert("Triangle meshes only");
		return undefined;
	    }

	    for (let i = 1; i < tokens.length; i++) {
		let index = (tokens[i].split("/")[0]).trim();
		indices.push(parseInt(index) - 1);
	    }
	}
    }

    let mesh = new Mesh();
    mesh.build(positions, indices);
    return mesh;

}
