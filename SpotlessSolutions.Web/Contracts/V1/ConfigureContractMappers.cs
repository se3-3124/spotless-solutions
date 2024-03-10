using AutoMapper;
using AutoMapper.Extensions.EnumMapping;
using SpotlessSolutions.Web.Contracts.V1.Requests;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Services.Authentication;
using SpotlessSolutions.Web.Services.Bookings;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Contracts.V1;

public static class ConfigureContractMappers
{
    public static void InjectAutoMapper(this IServiceCollection serviceCollection)
    {
        var mapper = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<AuthenticationResult, SessionResult>();
            cfg.CreateMap<RegistrationData, UserRegistrationData>();

            cfg.CreateMap<ServiceDetailConfig, BookingDetailsDto.ServiceDetailConfig>();
            cfg.CreateMap<Address, BookingDetailsDto.BookingAddress>();
            cfg.CreateMap<User, BookingDetailsDto.BookingUser>();
            cfg.CreateMap<BookingObject, BookingDetailsDto>();

            cfg.CreateMap<ServiceType, ServiceObjectType>()
                .ConvertUsingEnumMapping(opt => opt
                    .MapValue(ServiceType.Addons, ServiceObjectType.Addon)
                    .MapValue(ServiceType.Main, ServiceObjectType.Main))
                .ReverseMap();
            cfg.CreateMap<ServiceFieldType, ServiceFieldItemType>()
                .ConvertUsingEnumMapping(opt => opt
                    .MapValue(ServiceFieldType.FileUpload, ServiceFieldItemType.FileUpload)
                    .MapValue(ServiceFieldType.InputDate, ServiceFieldItemType.InputDate)
                    .MapValue(ServiceFieldType.InputNumeric, ServiceFieldItemType.InputNumeric)
                    .MapValue(ServiceFieldType.InputTextBox, ServiceFieldItemType.InputTextBox))
                .ReverseMap();

            cfg.CreateMap<ServiceExportObject, ServiceData>();
            cfg.CreateMap<ServiceFieldObject, ServiceFieldItem>();
            cfg.CreateMap<ServiceDetails, ServiceDetailsDto>();

            cfg.CreateMap<ServiceConfigDto, ServiceConfig>();
            cfg.CreateMap<ServiceConfig, ServiceConfigDto>();
        });

        serviceCollection.AddSingleton(mapper.CreateMapper());
    }
}
