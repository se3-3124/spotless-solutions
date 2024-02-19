namespace SpotlessSolutions.Web.Services.Services.Addons;

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
}
