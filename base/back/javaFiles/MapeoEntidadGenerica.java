/*
 * @fileoverview    {MapeoEntidadGenerica} se encarga de realizar tareas específicas.
 *
 * @version         2.0
 *
 * @author          Dyson Arley Parra Tilano <dysontilano@gmail.com>
 *
 * @copyright       Dyson Parra
 * @see             github.com/DysonParra
 *
 * History
 * @version 1.0     Implementación realizada.
 * @version 2.0     Documentación agregada.
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

    /**
     * TODO: Definición de {@code obtenerDto}.
     *
     * @param entidad
     * @return
     */
    @Mapping(source = "intIdEntidadGenerica", target = "intIdEntidadGenerica")
    //TODO: deben ser el campo clave de la base de datos ( la llave )
    @Override
    public EntidadGenericaDTO obtenerDto(EntidadGenerica entidad);

    /**
     * TODO: Definición de {@code obtenerEntidad}.
     *
     * @param entidadDTO
     * @return
     */
    @Mapping(source = "intIdEntidadGenerica", target = "intIdEntidadGenerica")
    @Override
    public EntidadGenerica obtenerEntidad(EntidadGenericaDTO entidadDTO);

    /**
     * TODO: Definición de {@code desdeId}.
     *
     * @param intId
     * @return
     */
    public default EntidadGenerica desdeId(String intId) {
        if (intId == null) {
            return null;
        }
        EntidadGenerica entidad = new EntidadGenerica();
        entidad.setIntIdEntidadGenerica(%parseId%(intId));
        return entidad;
    }
}
