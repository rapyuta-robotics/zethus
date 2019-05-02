---
id: visualizations-odometry
title: Odometry
---

Adds a visualization represented by a `nav_msgs/Odometry` topic to the scene.

## Overview

\[ Insert image here]  
The objects representing each odometry message are kept in the scene based on the value of the `keep` option.

## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Topic | The visualization_msgs/Marker topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Position tolerance | The linear distance, in meters, by which the odometry must change to cause a new arrow to spawn | 0.0001+ | 0.1  
Angle tolerance | The angle in radians by which the odometry must change to cause a new arrow to spawn | 0.0001+ | 0.1  
Keep | The number of arrows to keep before new arrows start causing old ones to disappear. 0 means an infinite number (dangerous) | 0+ | 100   
Shape | Shape of the object represented by each message | (Arrow, Axes) | Arrow  

The options are inspired from RViz and work very similar to it.
