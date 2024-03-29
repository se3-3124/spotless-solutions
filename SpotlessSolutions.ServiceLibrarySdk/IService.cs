﻿using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrarySdk;

public interface IService
{
    /// <summary>
    /// Calculates the price according to the value
    /// </summary>
    /// <param name="value">Json Serialized parameters</param>
    /// <param name="calculationDescriptor">Result of calculation</param>
    /// <returns></returns>
    bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor);

    /// <summary>
    /// Returns the ID of the service
    /// </summary>
    /// <returns></returns>
    string GetId();

    /// <summary>
    /// Gets the description of the service
    /// </summary>
    /// <returns></returns>
    string GetDescription();

    /// <summary>
    /// Update configuration of the service
    /// </summary>
    /// <param name="name"></param>
    /// <param name="description"></param>
    /// <param name="config"></param>
    void UpdateConfig(string name, string description, string config);

    /// <summary>
    /// Gets the name of the service
    /// </summary>
    /// <returns></returns>
    string GetName();

    /// <summary>
    /// Export the current instance value to object
    /// </summary>
    /// <returns></returns>
    ServiceExportObject ToExportObject();

    /// <summary>
    /// Gets the forms specific to the service
    /// </summary>
    /// <returns></returns>
    List<ServiceFieldObject> GetSpecificFieldObjects();

    /// <summary>
    /// Get the service type
    /// </summary>
    /// <returns></returns>
    ServiceType GetServiceType();
}
