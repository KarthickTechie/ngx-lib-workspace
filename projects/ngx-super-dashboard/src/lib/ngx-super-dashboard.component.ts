import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'lib-ngx-super-dashboard',
  template: `
    <div class="fields-bar">
      <form
        [formGroup]="dynamicForm"
        (ngSubmit)="onSubmitForm(dynamicForm.value)"
      >
        <div class="grid-label-bar" *ngIf="dynamicForm.value.length != 0">
          <ng-container
            *ngFor="let field of dynamicFormFieldData; let i = index"
          >
            <div
              class="list"
              *ngIf="
                field.lovDataList && field.lovDataList.length > 0;
                else dynamicNonDropdown
              "
            >
              <div class="lable">{{ field.lable }}<span>-</span></div>

              <select
                formControlName="{{ field.formControlKey }}"
                id="{{ field.formControlKey }}"
                (change)="seletedValue($event)"
                placeholder="Select"
              >
                <option selected value="">Select</option>
                <option
                  [value]="item.value"
                  *ngFor="let item of field.lovDataList"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>

            <ng-template #dynamicNonDropdown>
              <div class="list">
                <div class="lable">{{ field.lable }}<span>-</span></div>
                <input
                  type="{{ field.type }}"
                  class="picker"
                  formControlName="{{ field.formControlKey }}"
                  id="{{ field.formControlKey }}"
                  (change)="seletedValue($event)"
                  placeholder="Select"
                />
              </div>
            </ng-template>
          </ng-container>

          <div class="list lastList">
            <div class="lable">
              *Accounts in Actuals <br />
              *Ammount in Lakhs
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="grid-container">
      <div
        class="grid-area-countCards"
        *ngIf="cardConfig && cardConfig.length > 0"
      >
        <ng-container *ngFor="let item of cardConfig; let j = index">
          <div class="card card-border-left">
            <div class="card-header">
              <h3>{{ item.title }}</h3>
            </div>
            <div class="card-content">
              <p>{{ item.value }}</p>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .fields-bar {
        width: 100vw;
        position: fixed;
        top: 0;
        z-index: 999;
        background-color: #111249;
        display: flex;
      }
      .grid-label-bar {
        grid-template-columns: auto auto auto auto auto auto auto;
        gap: 10px;
        padding: 5px 14px;
        display: grid;
        color: #fff;
        font-size: 13px;
      }

      .grid-label-bar .list {
        display: flex;
        align-items: center;
      }

      .lable span {
        margin-left: 6px;
      }

      input.picker[type='date'] {
        position: relative;
      }

      input.picker[type='date']::-webkit-calendar-picker-indicator {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        color: transparent;
        background: transparent;
      }

      select,
      input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: none;
        border: none;
        color: #fff;
        width: 118px;
        padding: 0 6px;
      }
      select::-ms-expand {
        display: none; /* Hide the default arrow in Internet Explorer 10 and Internet Explorer 11 */
      }
      select:focus-visible {
        outline: none;
      }

      input::placeholder {
        color: #fff;
        opacity: 1; /* Firefox */
      }
      option {
        background-color: #fff;
        color: #000;
      }

      .grid-container {
        height: auto !important;
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        grid-template-rows: auto auto auto;
        gap: 12px;
        background-color: #dddddd96;
        padding: 7px;
        margin-top: 3rem;
      }

      .card {
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        margin: 5px 0 12px 0;
        text-align: center;
        background-color: #fff;
        width: 18vw;
        border-radius: 8px;
      }

      .card .card-header {
        padding: 14px;
        border-bottom: 1px solid #ddd;
        background: none;
        font-weight: 600;
        font-size: 15px;
      }
      .card .card-content {
        padding: 14px;
      }
      .card h3 {
        font-size: 15px;
        margin: 0;
      }
      .card p {
        font-weight: 600;
        font-size: 15px;
        color: #853163;
      }

      .grid-area-countCards {
        grid-area: 1/1/2/2;
      }

      .grid-area-chart {
        grid-area: 1/2/3/4;
      }

      .grid-area-chart .card {
        width: 40vw;
        height: 39.5vh;
        padding-bottom: 8px;
      }

      .grid-area-tableRecords {
        grid-area: 1/4/3/-1;
      }

      .grid-area-tableRecords .card {
        overflow: auto;
        width: 100%;
        height: 100%;
      }
      .grid-area-tableRecords .card-content {
        padding: 12px 10px;
      }

      .grid-table {
        font-weight: 400;
        font-size: 12px;
        border-collapse: collapse;
        width: 100%;
        height: auto;
        overflow: auto;
        border: 1px solid #ddd;
      }

      .grid-table tr,
      .grid-table th {
        border-bottom: 1px solid #ddd;
        padding: 8px;
      }
      .grid-table .colspan tr:last-child {
        border: none;
      }
      .colspan td {
        width: 20%;
        padding: 8px;
      }

      .grid-table td:nth-child(1),
      .grid-table th:nth-child(1) {
        border-right: 1px solid #f2f2f2;
      }

      .grid-table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
      }

      @media (max-width: 850px) {
        .grid-container {
          gap: 10px;
        }
      }

      @media (max-width: 1089px) {
        .grid-label-bar .lastList {
          display: none;
        }
      }

      @media (max-width: 786px) {
        .grid-label-bar {
          grid-template-columns: auto auto auto;
        }
      }
      @media (max-width: 580px) {
        .grid-label-bar {
          grid-template-columns: auto auto;
        }
        .card-header {
          font-size: 14px;
        }
        .grid-container {
          grid-template-columns: auto;
          grid-template-rows: auto;
          gap: 0px;
        }
        .grid-area-countCards,
        .grid-area-chart,
        .grid-area-tableRecords {
          grid-area: auto;
        }
        .grid-area-chart .card,
        .grid-area-countCards .card,
        .grid-area-tableRecords .card {
          width: 100%;
          height: auto;
        }
        .grid-area-countCards .card-content.chart {
          height: auto;
        }
      }
      .card-border-left {
        border-left-color: var(--purple-color);
        border-left-width: var(--card-border-width);
        border-left-style: solid;
      }
      .card-border-bottom {
        border-bottom-color: var(--purple-color);
        border-bottom-width: var(--card-border-width);
        border-bottom-style: solid;
      }
    `,
  ],
})
export class NgxSuperDashboardComponent implements OnInit {
  dynamicForm!: FormGroup;
  @Input({ required: true })
  dynamicFormFieldData!: DynamicFieldsData[];

  @Input({ required: true }) cardConfig!: DynamicCardsData[];

  @Output() onSelect = new EventEmitter<SelectedFieldValueEmit>();
  @Output() onSubmit = new EventEmitter();

  constructor(private fb: FormBuilder) {
    console.log(`NgxSuperDashboardComponent : constructor`);
  }

  ngOnInit() {
    //create dynamic fields and add validation for each field
    console.log(`NgxSuperDashboardComponent : ngOnInit`);
    this.createForm();
  }

  createForm() {
    let formGrp = {};
    this.dynamicFormFieldData.forEach((field: DynamicFieldsData) => {
      formGrp = {
        ...formGrp,
        [field.formControlKey]: ['', Validators.compose([Validators.required])],
      };
    });
    this.dynamicForm = this.fb.group(formGrp);
  }

  // emit selected field value
  seletedValue(ev: any) {
    this.onSelect.emit({
      selectedValue: ev.target.value,
      fieldControlName: ev.target.id,
    });
  }

  onSubmitForm(formValues: FormGroup) {
    this.onSubmit.emit(formValues);
  }
}

export const DynamicFieldsConfiguration = (
  fieldConfig: DynamicFieldsData[]
): DynamicFieldsData[] => {
  if (fieldConfig) return fieldConfig;
  else return testFieldData;
};

export const testFieldData: DynamicFieldsData[] = [
  { lable: 'Zone', formControlKey: 'zone', lovDataList: [] },
  { lable: 'Branch', formControlKey: 'branch', lovDataList: [] },
  { lable: 'Teams', formControlKey: 'teams', lovDataList: [] },
  { lable: 'Product', formControlKey: 'product', lovDataList: [] },
  { lable: 'Start Date', formControlKey: 'startDate', type: 'date' },
  { lable: 'End Date', formControlKey: 'endDate', type: 'date' },
];

export interface AppLOVData {
  name: string | number;
  value: string | number;
}

export interface DynamicFieldsData {
  lable: string;
  formControlKey: string;
  lovDataList?: AppLOVData[];
  type?: string;
  className?: string;
}

export interface SelectedFieldValueEmit {
  selectedValue: string | number;
  fieldControlName: string;
}

export interface SetDataOption {
  fetchLovData: Record<string, string | number | any | null>[];
  value?: string | number;
  name?: string;
  name2?: string;
}

// interfaces for grid cardsList:
export const DynamicCardsConfiguration = (
  cardConfig: DynamicCardsData[]
): DynamicCardsData[] => {
  if (cardConfig) return cardConfig;
  else return testCardData;
};

export const testCardData: DynamicCardsData[] = [
  { title: 'Total Proposals', value: 700 },
  { title: 'On Process', value: 230 },
  { title: 'Sanctioned', value: 300 },
  { title: 'Rejected', value: 254 },
  { title: 'Opened prending for > 30 days', value: 143 },
  { title: 'Disbursed', value: 120 },
];

export interface DynamicCardsData {
  title: string;
  value: number | string | null;
  className?: string;
}
