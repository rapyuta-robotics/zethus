---
id: visualizations-image
title: Image
---

Creates a container to visualize the image data represented by a `sensor_msgs/Image` topic.

## Overview
![](/img/viz/viz-image.png)
Adding the image visualization opens a new draggable container inside the same browser tab.
Click on Close to hide the container which can be reopened from the sidebar options.

## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Topic | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String


The options are [inspired from RViz](http://wiki.ros.org/rviz/DisplayTypes/Image) and work very similar to it.

Currently supported image encodings are Mono8, BRG8, RGB8.
