import React, { useState } from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../input/input";
import { Select } from "../select/select";
import calculatePrincipalBasedOnInterestAccured from "../../utils/calculate-principal-based-on-interest-accrued";

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
  interestEarned: z.string().transform(stringToNumber),
  rate: z.string().transform(stringToNumber),
  compoundPeriods: z.string().transform(stringToNumber),
  timeYears: z.string().transform(stringToNumber),
  timeMonths: z.string().transform(stringToNumber),
});

export const PrincipalBasedOnInterestAccrued: FC = () => {
  const [displayData, setDisplayData] = useState<{
    interestEarned: number | null;
    principal: number | null;
  }>({
    interestEarned: null,
    principal: null,
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      interestEarned: "",
      rate: "",
      compoundPeriods: "",
      timeYears: "",
      timeMonths: "",
    },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((values) => {
    const amount = calculatePrincipalBasedOnInterestAccured({
      interestEarned: Number.parseFloat(values.interestEarned),
      rate: Number.parseFloat(values.rate) / 100,
      compoundPeriods: Number.parseFloat(values.compoundPeriods),
      time:
        Number.parseFloat(values.timeYears) +
        Number.parseFloat(values.timeMonths) / 12,
    });

    setDisplayData({
      interestEarned: Number.parseFloat(values.interestEarned),
      principal: amount,
    });
  });

  return (
    <div className="flex flex-col gap-4 rounded border-2 p-8">
      <h2 className="text-lg font-bold">
        Calculate Princial based on Accrued Interest
      </h2>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <Input
            label="Interest ($)"
            type="number"
            step="0.01"
            {...register("interestEarned")}
          />
          <p className="text-red-600">
            {formState.errors.interestEarned?.message}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            label="Annual Rate (%)"
            type="number"
            step="0.01"
            {...register("rate")}
          />
          <p className="text-red-600">{formState.errors.rate?.message}</p>
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
        {typeof displayData.interestEarned === "number" &&
          typeof displayData.principal === "number" && (
            <React.Fragment>
              <p className="flex flex-col items-center justify-center text-2xl">
                <span>Principal amount:</span>
                <span className="font-bold">
                  {Intl.NumberFormat("en", {
                    currency: "USD",
                    style: "currency",
                    signDisplay: "auto",
                  }).format(displayData.principal)}
                </span>
              </p>
              <p className="flex flex-col items-center justify-center text-2xl">
                <span>Total Accrued amount:</span>
                <span className="font-bold">
                  {Intl.NumberFormat("en", {
                    currency: "USD",
                    style: "currency",
                    signDisplay: "auto",
                  }).format(displayData.principal + displayData.interestEarned)}
                </span>
              </p>
            </React.Fragment>
          )}
      </div>
    </div>
  );
};
