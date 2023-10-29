/*
 * @fileoverview    {Vehiculo}
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
package com.rtc.project.definicion.dominio;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * TODO: Definición de {@code Vehiculo}.
 *
 * @author Dyson Parra
 * @since 11
 */
@Entity
@Table(catalog = "cardinal", schema = "")
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class Vehiculo implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(nullable = false, length = 6)
    private String strPlacaVehiculo;
    @Column(length = 200)
    private String strObservaciones;
    @OneToMany(mappedBy = "strPlacaVehiculo")
    private Collection<RegistroVehiculo> registroVehiculoCollection;
    @JoinColumn(name = "intIdCategoria", referencedColumnName = "intIdCategoria")
    @ManyToOne
    private Categoria intIdCategoria;
    @OneToMany(mappedBy = "strPlacaVehiculo")
    private Collection<Comparendo> comparendoCollection;

}
