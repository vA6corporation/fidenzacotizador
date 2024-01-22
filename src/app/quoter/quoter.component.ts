import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsComponent } from "../products/products.component";

@Component({
    selector: 'app-quoter',
    standalone: true,
    templateUrl: './quoter.component.html',
    styleUrl: './quoter.component.sass',
    imports: [
        ProductsComponent,
        ReactiveFormsModule
    ]
})
export class QuoterComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
    ) { }

    formGroup = this.formBuilder.group({
        optionPrincipal: ['', Validators.required],
        optionSecundaria: ['', Validators.required],
        quantityWorkers: [null, Validators.required],
        incomes: [null, Validators.required],
    })

    // chargeSaludSanitas = 0
    // chargePensionSanitas = 0
    buttonDisabled = false
    insurances = [
        {
            id: '01',
            insurances: 'Sanitas',
            name: 'Salud',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/sanitas_seguros.png'
        },
        {
            id: '02',
            name: 'Pension',
            insurances: 'Sanitas',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/sanitas_seguros.png'
        },
        {
            id: '03',
            name: 'Salud & Pension',
            insurances: 'Sanitas',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/sanitas_seguros.png'
        },
        {
            id: '04',
            name: 'Salud',
            insurances: 'Pacifico',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/pacifico.png'
        },
        {
            id: '05',
            name: 'Pension',
            insurances: 'Pacifico',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/pacifico.png'
        },
        {
            id: '06',
            name: 'Salud & Pension',
            insurances: 'Pacifico',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/pacifico.png'
        },
        {
            id: '07',
            name: 'Salud',
            insurances: 'Mapfre',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/mapfre.png'
        },
        {
            id: '08',
            name: 'Pension',
            insurances: 'Mapfre',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/mapfre.png'
        },
        {
            id: '09',
            name: 'Salud & Pension',
            insurances: 'Mapfre',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/mapfre.png'
        },
        {
            id: '10',
            name: 'Salud',
            insurances: 'La Positiva',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/la-positiva.png'
        },
        {
            id: '11',
            name: 'Pension',
            insurances: 'La Positiva',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/la-positiva.png'
        },
        {
            id: '12',
            name: 'Salud & Pension',
            insurances: 'La Positiva',
            coverages: 100,
            deductuble: 0,
            charge: 0,
            imgPath: '/assets/la-positiva.png'
        } 
    ]

    onSubmit() {
        if (this.formGroup.valid) {
            const { optionPrincipal, optionSecundaria, incomes } = this.formGroup.value
            if (optionPrincipal && optionSecundaria) {
                const sector = this.sectors.find(e => e.id === optionPrincipal)
                if (sector) {
                    const subsector = sector.subsectors.find(e => e.id === optionSecundaria)
                    if (subsector && incomes) {
                        if (subsector.percentSaludSanitas === 0) {
                            this.insurances[0].charge = 0
                        } else {
                            const subTotalSaludSanitas = incomes * subsector.percentSaludSanitas / 100
                            this.insurances[0].charge = subTotalSaludSanitas + (subTotalSaludSanitas * 0.18)
                            if (this.insurances[0].charge < 118) {
                                this.insurances[0].charge = 118
                            }
                        }

                        if (subsector.percentPensionSanitas === 0) {
                            this.insurances[1].charge = 0
                        } else {
                            const subTotalPensionSanitas = incomes * subsector.percentPensionSanitas / 100
                            this.insurances[1].charge = subTotalPensionSanitas + (subTotalPensionSanitas * 0.18)
                            if (this.insurances[1].charge < 118) {
                                this.insurances[1].charge = 118
                            }
                        }

                        if (subsector.percentSaludSanitas === 0 && subsector.percentPensionSanitas === 0) {
                            this.insurances[2].charge = 0
                        } else {
                            this.insurances[2].charge = this.insurances[0].charge + this.insurances[1].charge
                            if ((this.insurances[0].charge + this.insurances[1].charge) < 118) {
                                this.insurances[2].charge = 118
                            }
                        }
                        // Pacifico
                        if (subsector.percentSaludPacifico === 0) {
                            this.insurances[3].charge = 0
                        } else {
                            const subTotalSaludPacifico = incomes * subsector.percentSaludPacifico / 100
                            this.insurances[3].charge = subTotalSaludPacifico + (subTotalSaludPacifico * 0.18)
                            if (this.insurances[3].charge < 118) {
                                this.insurances[3].charge = 118
                            }
                        }

                        if (subsector.percentPensionPacifico === 0) {
                            this.insurances[4].charge = 0
                        } else {
                            const subTotalPensionPacifico = incomes * subsector.percentPensionPacifico / 100
                            this.insurances[4].charge = subTotalPensionPacifico + (subTotalPensionPacifico * 0.2154)
                            if (this.insurances[4].charge < 118) {
                                this.insurances[4].charge = 118
                            }
                        }

                        if (subsector.percentSaludPacifico === 0 && subsector.percentPensionPacifico === 0) {
                            this.insurances[5].charge = 0
                        } else {
                            this.insurances[5].charge = this.insurances[3].charge + this.insurances[4].charge
                            if ((this.insurances[3].charge + this.insurances[4].charge) < 118) {
                                this.insurances[5].charge = 118
                            }
                        }

                        // Mapfre
                        if (subsector.percentSaludMapfre === 0) {
                            this.insurances[6].charge = 0
                        } else {
                            const subTotalSaludMapfre = incomes * subsector.percentSaludMapfre / 100
                            this.insurances[6].charge = subTotalSaludMapfre + (subTotalSaludMapfre * 0.18)
                            if (this.insurances[6].charge < 118) {
                                this.insurances[6].charge = 118
                            }
                        }

                        if (subsector.percentPensionMapfre === 0) {
                            this.insurances[7].charge = 0
                        } else {
                            const subTotalPensionMapfre = incomes * subsector.percentPensionMapfre / 100
                            this.insurances[7].charge = subTotalPensionMapfre + (subTotalPensionMapfre * 0.2154)
                            if (this.insurances[7].charge < 118) {
                                this.insurances[7].charge = 118
                            }
                        }


                        if (subsector.percentSaludMapfre === 0 && subsector.percentPensionMapfre === 0) {
                            this.insurances[8].charge = 0
                        } else {
                            this.insurances[8].charge = this.insurances[6].charge + this.insurances[7].charge
                            if ((this.insurances[6].charge + this.insurances[7].charge) < 118) {
                                this.insurances[8].charge = 118
                            }
                        }

                        // La Positiva
                        if (subsector.percentSaludLaPositiva === 0) {
                            this.insurances[9].charge = 0
                        } else {
                            const subTotalSaludLaPositiva = incomes * subsector.percentSaludLaPositiva / 100
                            this.insurances[9].charge = subTotalSaludLaPositiva + (subTotalSaludLaPositiva * 0.18)
                            if (this.insurances[9].charge < 118) {
                                this.insurances[9].charge = 118
                            }
                        }

                        if (subsector.percentPensionLaPositiva === 0) {
                            this.insurances[10].charge = 0
                        } else {
                            const subTotalPensionLaPositiva = incomes * subsector.percentPensionLaPositiva / 100
                            this.insurances[10].charge = subTotalPensionLaPositiva + (subTotalPensionLaPositiva * 0.18)
                            if (this.insurances[10].charge < 118) {
                                this.insurances[10].charge = 118
                            }
                        }

                        if (subsector.percentSaludLaPositiva === 0 && subsector.percentPensionLaPositiva === 0) {
                            this.insurances[11].charge = 0
                        } else {
                            this.insurances[11].charge = this.insurances[9].charge + this.insurances[10].charge
                            if ((this.insurances[9].charge + this.insurances[10].charge) < 118) {
                                this.insurances[11].charge = 118
                            }
                        }

                        this.buttonDisabled = true
                    }
                }
            }
        }
    }

    sectors = [
        {
            id: '01',
            sector: 'Construcción',
            subsectors: [
                {
                    id: '01',
                    label: 'Construcción de edificios residenciales',
                    percentSaludSanitas: 0.72,
                    percentPensionSanitas: .75,
                    percentSaludPacifico: 0.86,
                    percentPensionPacifico: .6,
                    // 
                    percentSaludMapfre: 1.19,
                    percentPensionMapfre: 1.2,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '02',
                    label: 'Construcción de edificios no residenciales',
                    percentSaludSanitas: 0.72,
                    percentPensionSanitas: .75,
                    percentSaludPacifico: 0.86,
                    percentPensionPacifico: .6,
                    // 
                    percentSaludMapfre: 1.49,
                    percentPensionMapfre: 1.2,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '03',
                    label: 'Construcción de carreteras y vias de ferrocaril',
                    percentSaludSanitas: 0.99,
                    percentPensionSanitas: .75,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // 
                    percentSaludMapfre: 1.49,
                    percentPensionMapfre: 1.2,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '04',
                    label: 'Construcción de otras obras de ingenieria civil',
                    percentSaludSanitas: 0.72,
                    percentPensionSanitas: .75,
                    percentSaludPacifico: 0.91,
                    percentPensionPacifico: .75,
                    // 
                    percentSaludMapfre: 1.49,
                    percentPensionMapfre: 1.2,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '05',
                    label: 'Demolición',
                    percentSaludSanitas: 0.72,
                    percentPensionSanitas: 1.06,
                    //No hay en pacífico
                    percentSaludPacifico: 0,
                    percentPensionPacifico: 0,
                    //No hay en mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '06',
                    label: 'Instalaciónes eléctricas',
                    percentSaludSanitas: 1.4,
                    percentPensionSanitas: 1.06,
                    // No hay en pacífico
                    percentSaludPacifico: 0,
                    percentPensionPacifico: 0,
                    // No hay en mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '07',
                    label: 'Instalaciones de fontenería, calefacción y aire acondicionado',
                    percentSaludSanitas: 1.4,
                    percentPensionSanitas: 0.75,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // No hay en mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '08',
                    label: 'Instalación Sistemas de alumbrado',
                    percentSaludSanitas: 0.88,
                    percentPensionSanitas: 1.24,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no hay en mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '09',
                    label: 'Otras instalaciones especializadas',
                    percentSaludSanitas: 0.72,
                    percentPensionSanitas: .89,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no hay en mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    // Mapfre Check
                    id: '10',
                    label: 'Terminación y acabado de edificios y obras de ingenieria civil',
                    percentSaludSanitas: 0.72,
                    percentPensionSanitas: .89,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // 
                    percentSaludMapfre: 1.49,
                    percentPensionMapfre: 1.2,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '11',
                    label: 'Otras actividades especializadas para la construcción de edificios y obras de ingenieria civil',
                    percentSaludSanitas: 0.72,
                    percentPensionSanitas: .89,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no hay en mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    // no seguro de las tasas
                    id: '12',
                    label: 'Construcción de represas, Hidroeléctricas, Centrales térmicas',
                    percentSaludSanitas: 0.99,
                    percentPensionSanitas: .75,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no hay en mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    // no seguro de las tasas
                    id: '13',
                    label: 'Construcción de Estadios, vias ferreas',
                    percentSaludSanitas: 0.99,
                    percentPensionSanitas: .75,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no hay en mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    // no seguro de las tasas
                    id: '14',
                    label: 'Construccion de ductos, túneles',
                    percentSaludSanitas: 0.99,
                    percentPensionSanitas: .75,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no hay en mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
            ]
        },
        {
            id: '02',
            sector: 'Transporte',
            subsectors: [
                {
                    // no seguro de las tasas
                    id: '01',
                    label: 'Transporte terrestre público automotor',
                    percentSaludSanitas: 0.99,
                    percentPensionSanitas: .84,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no hay en mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '02',
                    label: 'Transporte de pasajeros',
                    percentSaludSanitas: 0.99,
                    percentPensionSanitas: .84,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no hay en mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '03',
                    label: 'Transporte de carga por carretera',
                    percentSaludSanitas: 0.79,
                    percentPensionSanitas: .75,
                    // no disponible en Pacifico
                    percentSaludPacifico: 0,
                    percentPensionPacifico: 0,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    // no seguro de las tasas
                    id: '04',
                    label: 'Transporte terrestre de carga de materiales peligrosos (quimicos, explosivos, combustibles, etc.)',
                    percentSaludSanitas: 0.99,
                    percentPensionSanitas: .99,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '05',
                    label: 'Transporte terrestre de carga de otros materiales',
                    percentSaludSanitas: 0.79,
                    percentPensionSanitas: .75,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '06',
                    label: 'Transporte de pasajeros maritimo y cabotaje',
                    percentSaludSanitas: 2.1,
                    percentPensionSanitas: .84,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    // no seguro de las tasas
                    id: '07',
                    label: 'Transporte fluvial de pasajeros',
                    percentSaludSanitas: 2.1,
                    percentPensionSanitas: .84,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    // no seguro de las tasas
                    id: '08',
                    label: 'Transporte fluvial de carga',
                    percentSaludSanitas: 2.1,
                    percentPensionSanitas: .75,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '09',
                    label: 'Transporte aéreo de pasajeros',
                    percentSaludSanitas: 1.1,
                    percentPensionSanitas: .84,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '10',
                    label: 'Transporte aéreo de carga',
                    percentSaludSanitas: 1.1,
                    percentPensionSanitas: .85,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '11',
                    label: 'Almacenamiento y deposito',
                    percentSaludSanitas: 1.4,
                    percentPensionSanitas: 1.06,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '12',
                    label: 'Manipulación de carga',
                    percentSaludSanitas: 1.4,
                    percentPensionSanitas: 0.89,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '13',
                    label: 'Otras actividades complementarias al transporte',
                    percentSaludSanitas: 0.99,
                    percentPensionSanitas: .84,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '14',
                    label: 'Almacenamiento de materiales peligrosos (químicos, explosivos,combustibles,etc.)',
                    percentSaludSanitas: 1.4,
                    percentPensionSanitas: 1.06,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '15',
                    label: 'Actividades de mensajeria',
                    percentSaludSanitas: .99,
                    percentPensionSanitas: .9,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // no disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    // no seguro de las tasas
                    id: '16',
                    label: 'Servicios de mensajeria/ Reparto en otros vehiculos',
                    percentSaludSanitas: .99,
                    percentPensionSanitas: .9,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // No disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '17',
                    label: 'Servicios de mensajeria/ Reparto a pie',
                    percentSaludSanitas: .99,
                    percentPensionSanitas: .9,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // No disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                },
                {
                    id: '18',
                    label: 'Servicios de mensajeria/ Reparto en moto/bicicleta',
                    percentSaludSanitas: .99,
                    percentPensionSanitas: .9,
                    percentSaludPacifico: 0.80,
                    percentPensionPacifico: .82,
                    // No disponible en Mapfre
                    percentSaludMapfre: 0,
                    percentPensionMapfre: 0,
                    percentSaludLaPositiva: 0,
                    percentPensionLaPositiva: 0
                }
            ]

        }
    ]

    formUser: any;


}
