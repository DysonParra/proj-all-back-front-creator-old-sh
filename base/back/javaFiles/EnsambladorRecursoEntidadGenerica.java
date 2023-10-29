/*
 * @fileoverview    {EnsambladorRecursoEntidadGenerica}
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
package com.rtc.project.definicion.web.rest.ensamblador;

import com.rtc.project.definicion.servicio.dto.EntidadGenericaDTO;
import com.rtc.project.definicion.web.rest.RecursoEntidadGenerica;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;

/**
 * TODO: Description of {@code EnsambladorRecursoEntidadGenerica}.
 *
 * @author Dyson Parra
 * @since 11
 */
@Component
public class EnsambladorRecursoEntidadGenerica implements RepresentationModelAssembler<EntidadGenericaDTO, EntityModel<EntidadGenericaDTO>> {

    /**
     * TODO: Description of {@code toModel}.
     *
     * @param entidadDTO
     * @return
     */
    @Override
    public EntityModel<EntidadGenericaDTO> toModel(EntidadGenericaDTO entidadDTO) {
        return new EntityModel<>(entidadDTO,
                WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(RecursoEntidadGenerica.class).buscarEntidad(String.valueOf(entidadDTO.getIntIdEntidadGenerica()))).withSelfRel(),
                WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(RecursoEntidadGenerica.class).obtenerEntidades()).withRel("EntidadGenerica"));
    }
}
