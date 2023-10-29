/*
 * @fileoverview    {ServicioEntidadGenerica}
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
package com.rtc.project.definicion.servicio;

import com.rtc.project.definicion.servicio.dto.EntidadGenericaDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * TODO: Description of {@code ServicioEntidadGenerica}.
 *
 * @author Dyson Parra
 * @since 11
 */
public interface ServicioEntidadGenerica extends ServicioGenerico<EntidadGenericaDTO> {

    /**
     * TODO: Description of {@code obtenerEntidades}.
     *
     * @param id
     * @return
     * @throws java.lang.Exception
     */
    public List<EntidadGenericaDTO> obtenerEntidades(String id) throws Exception;

    /**
     * TODO: Description of {@code obtenerEntidades}.
     *
     * @param pageable
     * @return
     * @throws java.lang.Exception
     */
    public Page<EntidadGenericaDTO> obtenerEntidades(Pageable pageable) throws Exception;

    /**
     * TODO: Description of {@code query}.
     *
     * @param query
     * @param pageable
     * @return
     */
    public Page<EntidadGenericaDTO> query(String query, Pageable pageable);
}
