---
id: visualizations-robot-model
title: Robot model
---

Adds a visualization represented by a `tf/tfMessage` and `tf2_msgs/TFMessage` topic to the scene.

## Overview

![](/img/viz/viz-robotmodel.png)

## Options

Currently there are no options available for this display type.

[//]: # ( 
Topic | The nav_msgs/Path topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Color | The color of the line | \(\[0-255], \[0-255], \[0-255]\) | \(25, 255, 0\)  
Alpha | The amount of transparency to apply to the line | \[0-1] | 1  
Buffer length | The number of arrows to keep before new arrows start causing old ones to disappear. 0 means an infinite number \(dangerous\) | 0+ | 100   
Line style | Shape of the object for line segments joining the points | \(Lines, Billboards\) | Lines  
Pose style | Shape of the object for each point representing the path | \(Arrow, Axes\) | Arrow  
The options are inspired from RViz and work very similar to it.
)

