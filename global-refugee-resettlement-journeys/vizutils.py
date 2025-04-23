"""
vizutils.py

A module for visualization projects that contains utility 
functions for scaling data and generating layouts. 

Key Features:
- Generate grid, spiral, and radial layouts for visual elements.
- Support for custom data transformations for visualizations.
- Seamless integration with drawsvg for SVG rendering.

Dependencies:
- pandas
- numpy

Usage:
Import this module into your project or Jupyter Notebook:
    import vizutils as vu

Call functions directly, e.g.:
    df = vu.grid_layout(df, layout_width=500, layout_height=500)

"""


import pandas as pd
import numpy as np


def line_scale(df, column, domain_min, domain_max, range_min=0, range_max=1):
    # Create a copy to avoid modifying the original
    df_scaled = df.copy()
    # Avoid division by zero
    if domain_max == domain_min:
        df_scaled[column + '_scaled'] = range_min
        return df_scaled
    # Scale the values (length)
    values = df_scaled[column]
    scaled_values = (values - domain_min) * (range_max - range_min) / (domain_max - domain_min) + range_min
    # Clamp values to target range
    scaled_values = np.clip(scaled_values, range_min, range_max)
    # Add as new column
    df_scaled[column + '_scaled'] = scaled_values
    return df_scaled


def square_area_scale(df, column, domain_min, domain_max, range_min=0, range_max=1):
    # Create a copy to avoid modifying the original
    df_scaled = df.copy()
    # Avoid division by zero
    if domain_max == domain_min:
        df_scaled['area_scaled'] = range_min
        df_scaled['side_scaled'] = np.sqrt(range_min)
        return df_scaled
    # Scale the values to the range (area_scaled)
    values = df_scaled[column]
    area_scaled = (values - domain_min) * (range_max - range_min) / (domain_max - domain_min) + range_min
    # Clamp values to the target range
    area_scaled = np.clip(area_scaled, range_min, range_max)
    # Add area_scaled column
    df_scaled['area_scaled'] = area_scaled
    # Compute side length from the area (sqrt(area_scaled))
    df_scaled['side_scaled'] = np.sqrt(area_scaled)
    return df_scaled


def circle_area_scale(df, column, domain_min, domain_max, range_min=0, range_max=1):
    # Create a copy to avoid modifying the original
    df_scaled = df.copy()
    # Avoid division by zero
    if domain_max == domain_min:
        df_scaled['area_scaled'] = range_min
        df_scaled['radius_scaled'] = np.sqrt(range_min / np.pi)
        return df_scaled
    # Scale the values to the target range (area_scaled)
    values = df_scaled[column]
    area_scaled = (values - domain_min) * (range_max - range_min) / (domain_max - domain_min) + range_min
    # Clamp area_scaled to the target range
    area_scaled = np.clip(area_scaled, range_min, range_max)
    # Add area_scaled column
    df_scaled['area_scaled'] = area_scaled
    # Compute radius_scaled from the scaled area (radius = sqrt(area / π))
    df_scaled['radius_scaled'] = np.sqrt(area_scaled / np.pi)
    return df_scaled


def random_layout(df, layout_width, layout_height, min_dist=1):
    def is_valid_point(x, y, existing_points, min_dist):
        # Checks if a point (x, y) is valid given existing points and minimum distance.
        for ex, ey in existing_points:
            if np.sqrt((x - ex) ** 2 + (y - ey) ** 2) < min_dist:
                return False
        return True
    # List to store the valid random points
    points = []
    for _ in range(len(df)):
        while True:
            # Generate random x and y within the layout bounds
            x = np.random.uniform(0, layout_width)
            y = np.random.uniform(0, layout_height)
            # Check if this point is valid
            if is_valid_point(x, y, points, min_dist):
                points.append((x, y))
                break
    # Append the new random points as columns in the df
    random_x, random_y = zip(*points)
    df['random_x'] = random_x
    df['random_y'] = random_y
    return df


def distribute_layout(df, layout_size):
    num_elements = len(df)
    if num_elements == 1:
        # Handle the case where there's only one element
        distributed_values = [layout_size / 2]
    else:
        # Generate evenly spaced values across the layout size
        distributed_values = np.linspace(0, layout_size, num_elements)
    # Add the distributed values as a new column
    df['distribute_pos'] = distributed_values
    return df


def grid_layout(df, layout_width, layout_height):
    num_elements = len(df)
    # Calculate aspect ratio
    aspect_ratio = layout_width / layout_height
    # Compute number of columns and rows proportional to aspect ratio
    num_cols = np.ceil(np.sqrt(num_elements * aspect_ratio)).astype(int)
    num_rows = np.ceil(num_elements / num_cols).astype(int)
    # Compute exact spacing for grid
    x_spacing = layout_width / (num_cols - 1) if num_cols > 1 else layout_width
    y_spacing = layout_height / (num_rows - 1) if num_rows > 1 else layout_height
    # Generate grid positions
    grid_positions = [
        (col * x_spacing, row * y_spacing)
        for row in range(num_rows)
        for col in range(num_cols)
    ]
    # Trim positions to the number of elements in the df
    grid_positions = grid_positions[:num_elements]
    # Add grid_x and grid_y to the df
    df['grid_x'] = [pos[0] for pos in grid_positions]
    df['grid_y'] = [pos[1] for pos in grid_positions]
    return df


def circle_layout(df, layout_radius):
    num_elements = len(df)
    if num_elements == 0:
        raise ValueError("The df must have at least one element.")
    # Compute angles for evenly spaced points
    angles = np.linspace(0, 2 * np.pi, num_elements, endpoint=False)
    # Compute x and y coordinates for each point on the circle
    circle_x = layout_radius * np.cos(angles)
    circle_y = layout_radius * np.sin(angles)
    # Add the coordinates to the df
    df['circle_x'] = circle_x
    df['circle_y'] = circle_y
    return df


def spiral_layout(df, initial_radius, angle_increment, radius_growth):
    num_elements = len(df)
    # Convert angle increment to radians for trigonometric calculations
    angle_increment_rad = np.radians(angle_increment)
    # Calculate spiral positions
    spiral_x = []
    spiral_y = []
    for i in range(num_elements):
        angle = i * angle_increment_rad  # Current angle
        radius = initial_radius + i * radius_growth  # Current radius
        x = radius * np.cos(angle)  # x-coordinate
        y = radius * np.sin(angle)  # y-coordinate
        spiral_x.append(x)
        spiral_y.append(y)
    # Append the calculated spiral_x and spiral_y to the df
    df['spiral_x'] = spiral_x
    df['spiral_y'] = spiral_y
    return df


def cluster_layout(df, value_col, max_radius, iterations=100):
    # Normalize values to calculate radii
    max_value = df[value_col].max()
    df['cluster_radius'] = (df[value_col] / max_value) ** 0.5 * max_radius
    # Initialize random positions
    num_elements = len(df)
    df['cluster_x'] = np.random.uniform(-max_radius, max_radius, num_elements)
    df['cluster_y'] = np.random.uniform(-max_radius, max_radius, num_elements)
    # Collision resolution
    for _ in range(iterations):
        for i in range(num_elements):
            for j in range(i + 1, num_elements):
                # Calculate distance between bubbles
                dx = df.loc[i, 'cluster_x'] - df.loc[j, 'cluster_x']
                dy = df.loc[i, 'cluster_y'] - df.loc[j, 'cluster_y']
                dist = np.sqrt(dx**2 + dy**2)
                min_dist = df.loc[i, 'cluster_radius'] + df.loc[j, 'cluster_radius']
                # If overlapping, resolve collision
                if dist < min_dist and dist > 0:
                    overlap = min_dist - dist
                    push_x = dx / dist * overlap / 2
                    push_y = dy / dist * overlap / 2
                    df.loc[i, 'cluster_x'] += push_x
                    df.loc[i, 'cluster_y'] += push_y
                    df.loc[j, 'cluster_x'] -= push_x
                    df.loc[j, 'cluster_y'] -= push_y
    return df


