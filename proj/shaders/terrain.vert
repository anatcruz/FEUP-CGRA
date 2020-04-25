#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
varying vec2 vTextureCoord;

void main() {
	vTextureCoord = aTextureCoord;
	
	vec3 offset = aVertexNormal * texture2D(uSampler2, vTextureCoord).b * 0.5;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
