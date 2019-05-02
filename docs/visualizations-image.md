---
id: visualizations-image
title: Image (Not done) 
---

Creates a container to visualize the image data represented by a `sensor_msgs/Image` topic.

## Overview

\[ Insert image here]  
Currently only supports BGR8 encoding. Adding the image visualization opens a new draggable resizable container inside the same browser tab.  

## Options

Name | Description | Valid values | Default  
--- | --- | --- | ---
Alpha | The amount of transparency to apply to the image overlay | [0-1] | 1  
Topic | The sensor_msgs/Image topic to subscribe to. | Any valid Graph Resource Name | Empty String  

The options are inspired from RViz and work very similar to it.
