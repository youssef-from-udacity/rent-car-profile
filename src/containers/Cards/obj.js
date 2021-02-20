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
        insuranceCompanyName: "",
        insuranceEndDay: "",
        insurancePolicyNumber: "",
        insuranceReminder: "",
        insuranceReminderSwitch: false,
        insuranceStartDay: ""
    },
    maintenance: [
        [
            { ele: "EditButton", enable: true },
            { ele: "MaintenanceToDoInput", enable: true, placeholder: "ex: 10 000", value: '', },
            { ele: "CurrentOdometerInput", enable: true, value: '', },
            { ele: "MaintenanceSouldStart", enable: true, switchKey: true },
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
            { ele: "ReminderSwitch", enable: true, switchKey: false, value: '', },
        ],
        [
            { ele: "EditButton", enable: true },
            { ele: "MaintenanceToDoInput", enable: true, placeholder: "ex: 30 000", value: '', },
            { ele: "CurrentOdometerInput", enable: true, value: '', },
            { ele: "MaintenanceSouldStart", enable: true, switchKey: true },
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
            { ele: "ReminderSwitch", enable: true, switchKey: false, value: '', },
        ],
        [
            { ele: "EditButton", enable: true },
            { ele: "MaintenanceToDoInput", enable: true, placeholder: "ex: 60 000", value: '', },
            { ele: "CurrentOdometerInput", enable: true, value: '', },
            { ele: "MaintenanceSouldStart", enable: true, switchKey: true },
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
            { ele: "ReminderSwitch", enable: true, switchKey: false, value: '', },
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