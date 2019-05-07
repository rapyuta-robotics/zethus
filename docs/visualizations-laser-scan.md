---
id: visualizations-laser-scan
title: Laser scan
---

Adds a visualization represented by a `sensor_msgs/LaserScan` topic to the scene. Different primitives can be selected for data points from the available `Style` types.
Options to set different color channels

## Overview
![](/img/viz/viz-laserscan.png)

## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Topic | The  `sensor_msgs/LaserScan` topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Style | Type of primitive to show for each laser scan point | Points, Squares, Flat Squares, Sphere, Cube | Points
Size | The size for the selected Style | 0.01
Alpha | The amount of transparency to apply to the image overlay | \[0-1] | 1
Color Transformer | Set the colors for the data points based on available valid values| Intensity, Axis value, Flat Color, Intensity
Channel Name | The channel to interpolate against and set the color - Intensity Color Transformer | Intensity, X , Y, Z | Intensity
Axis Name | Select the axis to interpolate against and set the color - Axis Color Transformer. | X, Y, Z | X
Min Value | Min value setting used in calculation for the normalized color - Axis Color Transfomer | \[-inf, < Max Value] | 0
Max Value | Max value setting used in calculation for the normalized color - Axis Color Transfomer | \[> Min Value, inf] | 1
Min color| For Intensity Channel to set the color for minimum value. | (\[0-255], \[0-255], \[0-255]) | (0, 0, 0) 
Max color | For Intensity Channel to set the color for maximum value. | (\[0-255], \[0-255], \[0-255]) | (255, 255, 255) 
Min intensity | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Max intensity | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String 

[//]: # ( Invert rainbow | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String )
[//]: # ( Use rainbow | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String )
[//]: # ( Autocompute intensity bounds | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String)
 

The options are [inspired from RViz](http://wiki.ros.org/rviz/DisplayTypes/LaserScan) and work very similar to it.
