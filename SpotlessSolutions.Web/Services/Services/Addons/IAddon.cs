﻿namespace SpotlessSolutions.Web.Services.Services.Addons;

public interface IAddon
{
    /// <summary>
    /// Calculate addons
    /// </summary>
    /// <param name="values"></param>
    /// <returns></returns>
    float Calculate(float[] values);

    /// <summary>
    /// Get id
    /// </summary>
    /// <returns></returns>
    string GetId();

    /// <summary>
    /// Flag for checking whether the item is standalone or not
    /// </summary>
    /// <returns></returns>
    bool IsStandalone();

    /// <summary>
    /// Gets the description of the service
    /// </summary>
    /// <returns></returns>
    string GetDescription();

    /// <summary>
    /// Gets the name of the service
    /// </summary>
    /// <returns></returns>
    string GetName();

    /// <summary>
    /// Update Service configuration for this instance
    /// </summary>
    /// <param name="name"></param>
    /// <param name="description"></param>
    /// <param name="serviceConfig"></param>
    void UpdateConfiguration(string name, string description, string serviceConfig);

    /// <summary>
    /// Export the current instance value to object
    /// </summary>
    /// <returns></returns>
    ServiceExportObject ToExportObject();
}
