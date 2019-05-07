---
id: visualizations-path
title: Path
---

Adds a visualization represented by a `nav_msgs/Path` topic to the scene.

## Overview

![](/img/viz/viz-path.png)
> The objects representing each odometry message are kept in the scene based on the value of the `keep` option.

## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Topic | The `nav_msgs/Path` topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Color | The color of the line | (\[0-255], \[0-255], \[0-255]) | (25, 255, 0)  
Alpha | The amount of transparency to apply to the line | \[0-1] | 1  

[//]: # ( Buffer length | The number of arrows to keep before new arrows start causing old ones to disappear. 0 means an infinite number \(dangerous\) | 0+ | 100 )  
[//]: # ( Line style | Shape of the object for line segments joining the points | \(Lines, Billboards\) | Lines )
[//]: # ( Pose style | Shape of the object for each point representing the path | \(Arrow, Axes\) | Arrow )

The options are [inspired from RViz](http://wiki.ros.org/rviz/DisplayTypes/Path) and work very similar to it.
