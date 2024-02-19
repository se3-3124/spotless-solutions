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
}
