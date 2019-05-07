---
id: visualizations-pose-array
title: Pose array
---

Adds a visualization represented by a `geometry_msgs/PoseArray` topic to the scene. An array of pose is added to the scene based on the `Shape` type selected.

## Overview

![](/img/viz/viz-posearray.png)

## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Topic | The nav_msgs/Path topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Color | The color of the line | (\[0-255], \[0-255], \[0-255]) | (25, 255, 0)  
Alpha | The amount of transparency to apply to the line | \[0-1] | 1  
Shape | Shape of the object for line segments joining the points | (Lines, Billboards) | Lines  

The options are [inspired from RViz](http://wiki.ros.org/rviz/DisplayTypes/PoseArray) and work very similar to it.
