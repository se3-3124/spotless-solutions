namespace SpotlessSolutions.Web.Services.Services.Builtin;

public interface IService
{
    /// <summary>
    /// Indicates that the service requires transport fee
    /// </summary>
    /// <returns></returns>
    bool RequireTransportFee();

    /// <summary>
    /// Calculates the price according to the value
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    float Calculate(float[] value);

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
}
