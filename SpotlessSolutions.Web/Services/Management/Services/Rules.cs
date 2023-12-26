using System.Text.Json.Serialization;

namespace SpotlessSolutions.Web.Services.Management.Services;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "$discriminator")]
[JsonDerivedType(typeof(FixedRule), typeDiscriminator: "FixedRule")]
[JsonDerivedType(typeof(LessThanRule), typeDiscriminator: "LessThanRule")]
[JsonDerivedType(typeof(GreaterThanRule), typeDiscriminator: "GreaterThanRule")]
public abstract class BaseRule
{
    public virtual RuleType Type { get; init; }
    public float Value { get; init; }

    public abstract float GetValue(float value);
}

public class FixedRule : BaseRule
{
    public override RuleType Type
    {
        get
        {
            return RuleType.Fixed;    
        }
        init
        {
            // do nothing.
        }
    }

    public override float GetValue(float _)
    {
        return Value; 
    }
}

public class LessThanRule : BaseRule
{
    public float Threshold { get; init; }

    public override float GetValue(float value)
    {
        return value >= Threshold ? Value : 0;
    }
}

public class GreaterThanRule : BaseRule
{
    public float Threshold { get; init; }
    public float Rate { get; init; }

    public override float GetValue(float value)
    {
        if (value < Threshold)
        {
            return 0;
        }

        if (Type == RuleType.Fixed)
        {
            return Value;
        }
        
        return Value + ((value - Threshold) * Rate);
    }
}
