---
id: visualizations-map
title: Map
---

Adds a visualization represented by a `nav_msgs/OccupancyGrid` topic to the scene.

## Overview
![](/img/viz/viz-map.png)
Currently only supports BGR8 encoding. Adding the image visualization opens a new draggable resizable container inside the same browser tab.  

## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Alpha | The amount of transparency to apply to the map | \[0-1] | 1  
Topic | The nav_msgs/OccupancyGrid topic to subscribe to. | Any valid Graph Resource Name | Empty String  

The options are [inspired from RViz](http://wiki.ros.org/rviz/DisplayTypes/Map) and work very similar to it.
