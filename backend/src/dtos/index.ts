/**
 * Data Transfer Objects (DTOs)
 * Estandariza la estructura de datos para entrada y salida
 */

/**
 * DTO para crear o actualizar un tercero
 */
export const ThirdDTO = (data: any) => {
  return {
    typeIdentification: data.typeIdentification,
    identification: data.identification,
    name: data.name,
    additionalName: data.additionalName || null,
    address: data.address,
    phone: data.phone || null,
    mobile: data.mobile,
    email: data.email,
    city: data.city,
    department: data.department || null,
    birthday: data.birthday,
    gender: data.gender || null,
    impact: data.impact,
    supplied: data.supplied || null,
    habeasDataConsent: data.habeasDataConsent === true || data.habeasDataConsent === 'true',
    habeasDataFileUrl: data.habeasDataFileUrl || null,
    habeasDataSignature: data.habeasDataSignature || null,
    typeId: data.typeId,
    classificationId: data.classificationId === 0 ? null : data.classificationId,
    specialtyId: data.specialtyId,
    subSpecialtyId: data.subSpecialtyId === 0 ? null : data.subSpecialtyId,
    regionId: data.regionId,
    status: data.status || 'active'
  };
};

/**
 * DTO para respuesta de tercero
 */
export const ThirdResponseDTO = (third: any) => {
  const thirdDTO: any = {
    id: third.id,
    typeIdentification: third.typeIdentification,
    identification: third.identification,
    name: third.name,
    additionalName: third.additionalName,
    fullName: `${third.name} ${third.additionalName || ''}`.trim(),
    address: third.address,
    phone: third.phone,
    mobile: third.mobile,
    email: third.email,
    city: third.city,
    department: third.department,
    birthday: third.birthday,
    gender: third.gender,
    impact: third.impact,
    supplied: third.supplied,
    habeasDataConsent: third.habeasDataConsent,
    habeasDataFileUrl: third.habeasDataFileUrl,
    habeasDataSignature: third.habeasDataSignature,
    typeId: third.typeId,
    classificationId: third.classificationId,
    specialtyId: third.specialtyId,
    subSpecialtyId: third.subSpecialtyId,
    regionId: third.regionId,
    status: third.status,
    createdAt: third.createdAt,
    updatedAt: third.updatedAt
  };

  if (third.third_type) {
    thirdDTO.third_type = {
      id: third.third_type.id,
      name: third.third_type.name
    };
  }

  if (third.third_classification) {
    thirdDTO.third_classification = {
      id: third.third_classification.id,
      name: third.third_classification.name
    };
  }

  if (third.third_specialty) {
    thirdDTO.third_specialty = {
      id: third.third_specialty.id,
      name: third.third_specialty.name
    };
  }

  if (third.third_subspecialty) {
    thirdDTO.third_subspecialty = {
      id: third.third_subspecialty.id,
      name: third.third_subspecialty.name
    };
  }

  if (third.region) {
    thirdDTO.region = {
      id: third.region.id,
      name: third.region.name
    };
  }

  if (third.thirds_portfolios && third.thirds_portfolios.length > 0) {
    thirdDTO.thirds_portfolios = third.thirds_portfolios.map((tp: any) => ({
      id: tp.id,
      status: tp.status,
      approved: tp.approved,
      portfolio: tp.portfolio ? {
        id: tp.portfolio.id,
        name: tp.portfolio.name,
        status: tp.portfolio.status,
        userId: tp.portfolio.userId,
        user: tp.portfolio.user ? {
          id: tp.portfolio.user.id,
          firstName: tp.portfolio.user.firstName,
          lastName: tp.portfolio.user.lastName,
          email: tp.portfolio.user.email,
          status: tp.portfolio.user.status
        } : undefined
      } : undefined
    }));
  }

  return thirdDTO;
};

/**
 * DTO para crear o actualizar un portafolio
 */
export const PortfolioDTO = (data: any) => {
  return {
    name: data.name,
    userId: data.userId,
    status: data.status || 'active'
  };
};

/**
 * DTO para respuesta de portafolio
 */
export const PortfolioResponseDTO = (portfolio: any) => {
  return {
    id: portfolio.id,
    name: portfolio.name,
    userId: portfolio.userId,
    status: portfolio.status,
    createdAt: portfolio.createdAt,
    updatedAt: portfolio.updatedAt
  };
};

/**
 * DTO para respuesta de error
 */
export const ErrorResponseDTO = (message: string, statusCode = 400, details: any = null) => {
  return {
    error: true,
    message,
    statusCode,
    details
  };
};

/**
 * DTO para respuesta de éxito
 */
export const SuccessResponseDTO = (message: string, data: any = null) => {
  return {
    success: true,
    message,
    data
  };
};
