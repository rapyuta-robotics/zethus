---
id: visualizations-pose
title: Pose
---

Adds a visualization represented by a `geometry_msgs/PoseStamped` topic to the scene.

## Overview

![](/img/viz/viz-pose.png)

## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Topic | The nav_msgs/Path topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Color | The color of the line | (\[0-255], \[0-255], \[0-255]) | (25, 255, 0)  
Alpha | The amount of transparency to apply to the line | \[0-1] | 1  
Shape | Shape of the object for each point representing the path | (Arrow, Axes) | Arrow  

The options are [inspired from RViz](http://wiki.ros.org/rviz/DisplayTypes/Pose) and work very similar to it.
