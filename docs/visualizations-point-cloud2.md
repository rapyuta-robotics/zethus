---
id: visualizations-point-cloud2
title: Point cloud 2
---

Adds a visualization represented by a `sensor_msgs/PointCloud2` topic to the scene.

## Overview

![](/img/viz/viz-pointcloud.png)
The objects representing each odometry message are kept in the scene based on the value of the `keep` option.

## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Topic | The `sensor_msgs/PointCloud2` topic to subscribe to. | Any valid Graph Resource Name | Empty String  

