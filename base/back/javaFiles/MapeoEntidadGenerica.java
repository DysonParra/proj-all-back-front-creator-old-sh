/*
 * @fileoverview    {MapeoEntidadGenerica}
 *
 * @version         2.0
 *
 * @author          Dyson Arley Parra Tilano <dysontilano@gmail.com>
 *
 * @copyright       Dyson Parra
 * @see             github.com/DysonParra
 *
 * History
 * @version 1.0     Implementation done.
 * @version 2.0     Documentation added.
 */
package com.rtc.project.definicion.servicio.mapeo;

import com.rtc.project.definicion.dominio.EntidadGenerica;
import com.rtc.project.definicion.servicio.dto.EntidadGenericaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * TODO: Description of {@code MapeoEntidadGenerica}.
 *
 * @author Dyson Parra
 * @since 11
 */
@Mapper(componentModel = "spring") //, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MapeoEntidadGenerica extends MapeoEntidadesGenerico<EntidadGenericaDTO, EntidadGenerica> {

    /**
     * TODO: Description of {@code obtenerDto}.
     *
     * @param entidad
     * @return
     */
    @Mapping(source = "intIdEntidadGenerica", target = "intIdEntidadGenerica")
    //TODO: deben ser el campo clave de la base de datos ( la llave )
    @Override
    public EntidadGenericaDTO obtenerDto(EntidadGenerica entidad);

    /**
     * TODO: Description of {@code obtenerEntidad}.
     *
     * @param entidadDTO
     * @return
     */
    @Mapping(source = "intIdEntidadGenerica", target = "intIdEntidadGenerica")
    @Override
    public EntidadGenerica obtenerEntidad(EntidadGenericaDTO entidadDTO);

    /**
     * TODO: Description of {@code desdeId}.
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
