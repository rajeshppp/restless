export default class ManualCodePlot {
  constructor(
    public stopId: string | null = null,
    public stopIdType: string | null = null,
    // public primaryAddress: string | null = null,
    // public city: string | null = null,
    // public state: string | null = null,
    // public zip11: string | null = null,
    // public resolvedDt: string | null = null,
    // public resolvedBy: string | null = null,
    // public resolvedDevice: string | null = null,
    public latitude: string | null = null,
    public longitude: string | null = null
  ) {}
}
