const obj = {
    booking: {
        bookingEndDay: null,
        bookingStartDay: null
    },
    information: {
        avatarURL: "",
        energy: "",
        name: "",
        odometer: 0,
        plate: "",
        power: ""
    },
    insurance: {
        insuranceCompanyName: {
          value: ""
        },
        insuranceEndDay: {
          value: ''
        },
        insurancePolicyNumber: {
          value: ""
        },
        insuranceStartDay: {
          value: '1613590440000'
        },
        reminder: {
          panel: "panel2",
          switchKey: false,
          tab: 0,
          type: "Insurance expiration Date",
          value: ''
        }
      },
    maintenance: [
        [
            { ele: "EditButton", enable: true },
            { ele: "MaintenanceToDoInput", enable: true, placeholder: "ex: 10 000", value: '', },
            { ele: "CurrentOdometerInput", enable: true, value: '', },
            { ele: "MaintenanceShouldStart", enable: true, switchKey: true },
            { ele: "OilDistance", enable: true, switchKey: true },
            { ele: "AirFilterSwitch", enable: true, switchKey: true },
            { ele: "OilFilterSwitch", enable: true, switchKey: true },
            { ele: "BatteryState", enable: false, switchKey: false },
            { ele: "CarBrakeSwitch", enable: false, switchKey: false },
            { ele: "TimingBeltSwitch", enable: false, switchKey: false },
            { ele: "ExhaustPipeSwitch", enable: false, switchKey: false },
            { ele: "GearBoxOilSwitch", enable: false, switchKey: false },
            { ele: "TiresStateSwitch", enable: false, switchKey: false },
            { ele: "EngineSparkSwitch", enable: false, switchKey: false },
            { ele: "GasolinFilterSwitch", enable: false, switchKey: false },
            { ele: "SteeringLiquidSwitch", enable: false, switchKey: false },
            { ele: "ReminderSwitch", enable: true, switchKey: false, value: '', tab: 1, type: 'Maintenance expiration Date' },
        ],
        [
            { ele: "EditButton", enable: true },
            { ele: "MaintenanceToDoInput", enable: true, placeholder: "ex: 30 000", value: '', },
            { ele: "CurrentOdometerInput", enable: true, value: '', },
            { ele: "MaintenanceShouldStart", enable: true, switchKey: true },
            { ele: "OilDistance", enable: false, switchKey: false },
            { ele: "AirFilterSwitch", enable: false, switchKey: false },
            { ele: "OilFilterSwitch", enable: false, switchKey: false },
            { ele: "BatteryState", enable: true, switchKey: true },
            { ele: "CarBrakeSwitch", enable: true, switchKey: true },
            { ele: "TimingBeltSwitch", enable: true, switchKey: true },
            { ele: "ExhaustPipeSwitch", enable: true, switchKey: true },
            { ele: "GearBoxOilSwitch", enable: true, switchKey: true },
            { ele: "TiresStateSwitch", enable: true, switchKey: true },
            { ele: "EngineSparkSwitch", enable: false, switchKey: false },
            { ele: "GasolinFilterSwitch", enable: false, switchKey: false },
            { ele: "SteeringLiquidSwitch", enable: false, switchKey: false },
            { ele: "ReminderSwitch", enable: true, switchKey: false, value: '', tab: 1,type: 'Maintenance expiration Date' },
        ],
        [
            { ele: "EditButton", enable: true },
            { ele: "MaintenanceToDoInput", enable: true, placeholder: "ex: 60 000", value: '', },
            { ele: "CurrentOdometerInput", enable: true, value: '', },
            { ele: "MaintenanceShouldStart", enable: true, switchKey: true },
            { ele: "OilDistance", enable: false, switchKey: false },
            { ele: "AirFilterSwitch", enable: false, switchKey: false },
            { ele: "OilFilterSwitch", enable: false, switchKey: false },
            { ele: "BatteryState", enable: false, switchKey: false },
            { ele: "CarBrakeSwitch", enable: false, switchKey: false },
            { ele: "TimingBeltSwitch", enable: false, switchKey: false },
            { ele: "ExhaustPipeSwitch", enable: false, switchKey: false },
            { ele: "GearBoxOilSwitch", enable: false, switchKey: false },
            { ele: "TiresStateSwitch", enable: false, switchKey: false },
            { ele: "EngineSparkSwitch", enable: true, switchKey: true },
            { ele: "GasolinFilterSwitch", enable: true, switchKey: true },
            { ele: "SteeringLiquidSwitch", enable: true, switchKey: true },
            { ele: "ReminderSwitch", enable: true, switchKey: false, value: '', tab: 1,type: 'Maintenance expiration Date' },
        ],
    ],
}

export default function getDataObj() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(obj)
        }, 1000)
    })
}