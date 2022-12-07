package test

import (
	"testing"
	"github.com/gruntwork-io/terratest/modules/docker"
	"github.com/stretchr/testify/assert"
)

func TestSmoke(t *testing.T) {
	// website::tag::1:: Configure the tag to use on the Docker image.
	tag := "docker-smoke"
	buildOptions := &docker.BuildOptions{
		Tags: []string{tag},
	}

	// website::tag::2:: Build the Docker image.
	docker.Build(t, "../", buildOptions)

	// website::tag::3:: Run the Docker image.
	opts := &docker.RunOptions{Command: []string{"ls", "/"}}
	output := docker.Run(t, tag, opts)
	assert.Contains(t, output, "etc")
}
