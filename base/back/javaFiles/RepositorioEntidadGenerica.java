/*
 * @fileoverview    {RepositorioEntidadGenerica}
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
package com.rtc.project.definicion.repositorio;

import com.rtc.project.definicion.dominio.EntidadGenerica;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * TODO: Description of {@code RepositorioEntidadGenerica}.
 *
 * @author Dyson Parra
 * @since 11
 */
@Repository
public interface RepositorioEntidadGenerica extends JpaRepository<EntidadGenerica, %PkFormat%> {

    /**
     * TODO: Description of {@code findByIntIdEntidadGenerica}.
     *
     * @param id
     * @return
     */
    public List<EntidadGenerica> findByIntIdEntidadGenerica(%PkFormat% id);

    /**
     * TODO: Description of {@code buscarEntidades}.
     *
     * @param strBusqueda
     * @param pageable
     * @return
     */
    @Query("SELECT m FROM EntidadGenerica m WHERE m.intIdEntidadGenerica LIKE CONCAT('%', :strBusqueda, '%')")
    public Page<EntidadGenerica> buscarEntidades(@Param("strBusqueda") String strBusqueda, Pageable pageable);
}
