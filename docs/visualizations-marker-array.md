---
id: visualizations-marker-array
title: Marker array
---

Adds a visualization represented by a `visualization_msgs/Marker` or `visualization_msgs/MarkerArray` topic to the scene.

## Overview

![](/img/viz/viz-markerarray.png)

## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Topic | The `visualization_msgs/MarkerArray` topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Namespaces | A list of namespaces available which can be hidden or shown | boolean | true

The options are [inspired from RViz](http://wiki.ros.org/rviz/DisplayTypes/Marker) and work very similar to it.