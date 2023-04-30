import React, { useState } from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../form-fields/input";
import { Select } from "../form-fields/select";
import calculateInterestRateBasedOnAccruedAndPrincipal from "../../utils/calculate-interest-rate-based-on-accrued-and-principal";

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
  accrued: z.string().transform(stringToNumber),
  principal: z.string().transform(stringToNumber),
  compoundPeriods: z.string().transform(stringToNumber),
  timeYears: z.string().transform(stringToNumber),
  timeMonths: z.string().transform(stringToNumber),
});

export const InterestRateBasedOnAccruedAndPrincipal: FC = () => {
  const [displayData, setDisplayData] = useState<{
    rate: number | null;
  }>({
    rate: null,
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      accrued: '',
      principal: '',
      compoundPeriods: '',
      timeYears: '',
      timeMonths: '',
    },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((values) => {
    const amount = calculateInterestRateBasedOnAccruedAndPrincipal({
      accrued: Number.parseFloat(values.accrued),
      principal: Number.parseFloat(values.principal),
      compoundPeriods: Number.parseFloat(values.compoundPeriods),
      time:
        Number.parseFloat(values.timeYears) +
        Number.parseFloat(values.timeMonths) / 12,
    });

    setDisplayData({
      rate: amount,
    });
  });

  return (
    <div className="flex flex-col gap-4 rounded border-2 p-8">
      <h2 className="text-lg font-bold">
        Calculate Interest Rate based on Accrued and Principal Amounts
      </h2>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <Input
            label="Accrued ($)"
            type="number"
            step="0.01"
            {...register("accrued")}
          />
          <p className="text-red-600">{formState.errors.accrued?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            label="Principal ($)"
            type="number"
            step="0.01"
            {...register("principal")}
          />
          <p className="text-red-600">{formState.errors.principal?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <Select
            label="Compound"
            placeholder={"Select"}
            options={compoundOptions}
            {...register("compoundPeriods")}
          />
          <p className="text-red-600">
            {formState.errors.compoundPeriods?.message}
          </p>
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
                {...register("timeYears")}
              />
              <p className="text-red-600">
                {formState.errors.timeYears?.message}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Select
                label="Months"
                placeholder="Select an option"
                options={timeOptions}
                {...register("timeMonths")}
              />
              <p className="text-red-600">
                {formState.errors.timeMonths?.message}
              </p>
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
        {typeof displayData.rate === 'number' && (
          <p className="flex flex-col items-center justify-center text-2xl">
            <span>Interest Rate:</span>
            <span className="font-bold">
              {Intl.NumberFormat("en", {
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 3
              }).format(displayData.rate)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
