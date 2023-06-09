import React, { useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../form-fields/input';
import { Select } from '../form-fields/select';
import calculateCompoundInterest from '../../utils/calculate-compound-interest';

const compoundOptions = [
  {
    label: "Daily (365)",
    value: "365",
  },
  {
    label: "Daily (360)",
    value: "360",
  },
  {
    label: "Weekly",
    value: "52",
  },
  {
    label: "Bi-Weekly",
    value: "26",
  },
  {
    label: "Monthly",
    value: "12",
  },
  {
    label: "Bi-Monthly",
    value: "6",
  },
  {
    label: "Quarterly",
    value: "4",
  },
  {
    label: "Semi-Annually",
    value: "2",
  },
  {
    label: "Annually",
    value: "1",
  },
];

const timeOptions = [...new Array(12)].map((_, i) => ({
  label: `${i}`,
  value: `${i}`,
}));

function stringToNumber(value: string, ctx: z.RefinementCtx) {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not a number",
    });

    return z.never;
  }
  return parsed;
}

const schema = z.object({
  principal: z.string().transform(stringToNumber),
  rate: z.string().transform(stringToNumber),
  compoundPeriods: z.string().transform(stringToNumber),
  timeYears: z.string().transform(stringToNumber),
  timeMonths: z.string().transform(stringToNumber),
});

export const CompoundInterestCalculator: FC = () => {
  const [displayData, setDisplayData] = useState<{
    accrued: number | null;
    principal: number | null;
  }>({
    accrued: null,
    principal: null,
  });

  const {
    register,
    handleSubmit,
    formState,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      principal: '',
      rate: '',
      compoundPeriods: '',
      timeYears: '',
      timeMonths: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit((values) => {
    const amount = calculateCompoundInterest({
      principal: Number.parseFloat(values.principal),
      rate: Number.parseFloat(values.rate) / 100,
      compoundPeriods: Number.parseFloat(values.compoundPeriods),
      time: Number.parseFloat(values.timeYears) + Number.parseFloat(values.timeMonths) / 12,
    });

    setDisplayData({
      accrued: amount,
      principal: Number.parseFloat(values.principal),
    });
  });

  return (
    <div className="flex flex-col gap-4 rounded border-2 p-8">
      <h2 className="text-xl font-bold">Compound Interest Calculator</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-1">
          <Input
            label="Principal ($)"
            type="number"
            {...register('principal')}
          />
          <p className="text-red-600">{formState.errors.principal?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            label="Annual Rate (%)"
            type="number"
            step="0.01"
            {...register('rate')}
          />
          <p className="text-red-600">{formState.errors.rate?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <Select
            label="Compound"
            placeholder={"Select"}
            options={compoundOptions}
            {...register('compoundPeriods')}
          />
          <p className="text-red-600">{formState.errors.compoundPeriods?.message}</p>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <legend className="block">
            <span className="text-gray-700">Time (in years)</span>
          </legend>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-1">
              <Input
                label="Years"
                type="number"
                max={100}
                {...register('timeYears')}
              />
              <p className="text-red-600">{formState.errors.timeYears?.message}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Select
                label="Months"
                placeholder="Select an option"
                options={timeOptions}
                {...register('timeMonths')}
              />
              <p className="text-red-600">{formState.errors.timeMonths?.message}</p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-none bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
        >
          Calculate
        </button>
      </form>
      <div className="flex flex-col">
        {typeof displayData.accrued === 'number' && typeof displayData.principal === 'number' && (
          <React.Fragment>
            <p className="text-2xl flex flex-col justify-center items-center">
              <span>Accrued amount:</span>
              <span className="font-bold">{Intl.NumberFormat('en', {
                currency: 'USD',
                style: 'currency',
                signDisplay: 'auto',
              }).format(displayData.accrued)}
              </span>
            </p>
            <p className="text-2xl flex flex-col justify-center items-center">
              <span>Accrued interest:</span>
              <span className="font-bold">{Intl.NumberFormat('en', {
                currency: 'USD',
                style: 'currency',
                signDisplay: 'auto',
              }).format(displayData.accrued - displayData.principal)}
              </span>
            </p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
