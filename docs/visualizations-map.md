---
id: visualizations-map
title: Map
---

Adds a visualization represented by a `nav_msgs/OccupancyGrid` topic to the scene. The occupancy grid is treated the way the [navigation](http://wiki.ros.org/navigation) stack treats it. 

## Overview
![](/img/viz/viz-map.png)

> A value of 100 is black (occupied), a value of 0 is white (unoccupied), a value of -1 is Unknown(grey) and anything else is taken as is.


## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Topic | The `nav_msgs/OccupancyGrid` topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Alpha | The amount of transparency to apply to the map | \[0-1] | 1  
Color Scheme | Different color scheme to parse the map data. | map, constmap, raw | map
Draw Behind | Draw behind the map plane, visible on both faces. | boolean | false

The options are [inspired from RViz](http://wiki.ros.org/rviz/DisplayTypes/Map) and work very similar to it.
For the color scheme 
