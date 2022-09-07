/*
 * @fileoverview {FileName} se encarga de realizar tareas especificas.
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dysontilano@gmail.com>
 * Copyright (C) Dyson Parra
 *
 * @History v1.0 --- La implementacion de {FileName} fue realizada el 31/07/2022.
 * @Dev - La primera version de {FileName} fue escrita por Dyson A. Parra T.
 */
package com.rtc.project.definicion.servicio.mapeo;

import com.rtc.project.definicion.dominio.EntidadGenerica;
import com.rtc.project.definicion.servicio.dto.EntidadGenericaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * TODO: Definición de {@code MapeoEntidadGenerica}.
 *
 * @author Dyson Parra
 * @since 1.8
 */
@Mapper(componentModel = "spring") //, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MapeoEntidadGenerica extends MapeoEntidadesGenerico<EntidadGenericaDTO, EntidadGenerica> {

    @Mapping(source = "intIdEntidadGenerica", target = "intIdEntidadGenerica")
    //TODO: deben ser el campo clave de la base de datos ( la llave )
    public EntidadGenericaDTO obtenerDto(EntidadGenerica entidad);

    @Mapping(source = "intIdEntidadGenerica", target = "intIdEntidadGenerica")
    public EntidadGenerica obtenerEntidad(EntidadGenericaDTO entidadDTO);

    default EntidadGenerica desdeId(String intId) {
        if (intId == null) {
            return null;
        }
        EntidadGenerica entidad = new EntidadGenerica();
        entidad.setIntIdEntidadGenerica( % parseId % (intId));
        return entidad;
    }
}
