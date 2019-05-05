---
id: visualizations-laser-scan
title: Laser scan
---

Adds a visualization represented by a `sensor_msgs/LaserScan` topic to the scene.

## Overview
![](/img/viz/viz-laserscan.png)

## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Channel name | The amount of transparency to apply to the image overlay | [0-1] | 1  
Use rainbow | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Invert rainbow | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Min color| The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Max color | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Autocompute intensity bounds | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Min intensity | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String  
Max intensity | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String  

The options are inspired from RViz and work very similar to it.
