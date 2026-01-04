"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Receipt, Building, ArrowRight, Check, Calculator, Files, Users, Shield, CloudArrowUp, Sparkle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc/client";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { cn } from "@/lib/utils";

interface OnboardingFormProps {
  initialName: string;
  email: string;
  initialPhone: string;
}

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={stepNum} className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full border-2 transition-all",
                isCompleted && "border-primary bg-primary text-primary-foreground",
                isActive && "border-primary bg-primary/10 text-primary",
                !isCompleted && !isActive && "border-muted text-muted-foreground"
              )}
            >
              {isCompleted ? (
                <Check className="size-4" weight="bold" />
              ) : (
                <span className="text-sm font-semibold">{stepNum}</span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "h-0.5 w-16 transition-colors",
                  isCompleted ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function OnboardingForm({
  initialName,
  email,
  initialPhone,
}: OnboardingFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const updateProfile = trpc.users.updateProfile.useMutation({
    onSuccess: () => {
      setStep(2);
    },
  });

  useEffect(() => {
    if (step === 1 && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [step]);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  }

  function handleStep1Submit(e: React.FormEvent) {
    e.preventDefault();
    updateProfile.mutate({ name, phone: phone || undefined });
  }

  function handleStep2Continue() {
    setStep(3);
  }

  if (step === 1) {
    return (
      <div className="flex flex-col gap-6 max-w-lg w-full">
        <StepIndicator currentStep={1} totalSteps={3} />
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Receipt className="size-6 text-primary" weight="duotone" />
            </div>
            <h1 className="text-2xl font-bold">Välkommen till Kvitty!</h1>
            <FieldDescription className="text-base">
              Låt oss börja med att lära känna dig lite bättre
            </FieldDescription>
          </div>

          <form onSubmit={handleStep1Submit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Ditt namn</FieldLabel>
                <Input
                  ref={nameInputRef}
                  id="name"
                  type="text"
                  placeholder="t.ex. Anna Andersson"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={updateProfile.isPending}
                />
                <FieldDescription>
                  Detta namn kommer att visas för andra medlemmar i dina arbetsytor
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="email">E-postadress</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
                <FieldDescription>
                  Din e-postadress kan inte ändras
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">
                  Telefonnummer <span className="text-muted-foreground font-normal">(valfritt)</span>
                </FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="070-123 45 67"
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={updateProfile.isPending}
                  maxLength={15}
                />
                <FieldDescription>
                  Används för kontakter och support. Du kan lägga till detta senare.
                </FieldDescription>
              </Field>

              {updateProfile.error && (
                <p className="text-sm text-red-500 text-center">
                  {updateProfile.error.message}
                </p>
              )}

              <Field>
                <Button
                  type="submit"
                  disabled={updateProfile.isPending || !name.trim()}
                  className="w-full"
                >
                  {updateProfile.isPending ? (
                    <Spinner />
                  ) : (
                    <>
                      Fortsätt
                      <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </FieldGroup>
      </div>
    );
  }

  if (step === 2) {
    const features = [
      {
        icon: Calculator,
        title: "Komplett bokföring",
        description: "Hantera allt från kvitton till årsbokslut",
      },
      {
        icon: Receipt,
        title: "Kvittohantering",
        description: "Ladda upp och organisera kvitton enkelt",
      },
      {
        icon: Files,
        title: "Fakturering",
        description: "Skapa och skicka fakturor till kunder",
      },
      {
        icon: Users,
        title: "Teamarbete",
        description: "Bjud in kollegor och samarbeta smidigt",
      },
      {
        icon: Shield,
        title: "Säker lagring",
        description: "Alla dina data säkerhetskopieras automatiskt",
      },
      {
        icon: CloudArrowUp,
        title: "Molntjänst",
        description: "Tillgång överallt, när som helst",
      },
    ];

    return (
      <div className="flex flex-col gap-6 max-w-2xl w-full">
        <StepIndicator currentStep={2} totalSteps={3} />
        <FieldGroup>
          <div className="flex flex-col items-center gap-3 text-center mb-2">
            <h1 className="text-2xl font-bold">
              {name ? `Hej ${name.split(" ")[0]}! 👋` : "Hej där! 👋"}
            </h1>
            <FieldDescription className="text-base max-w-xl text-center">
              Kvitty är ett modernt bokförings- och faktureringssystem som gör det enkelt att hantera din ekonomi. Här är några av de viktigaste funktionerna:
            </FieldDescription>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex gap-3 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" weight="duotone" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 my-2">
            <div className="flex items-start gap-3">
              <Building className="size-5 text-primary mt-0.5 shrink-0" weight="duotone" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Vad är en arbetsyta?</h3>
                <p className="text-sm text-muted-foreground">
                  En arbetsyta är som en separat mapp för varje företag eller projekt. Du kan ha flera arbetsytor och växla mellan dem när du vill. Varje arbetsyta har sin egen bokföring, fakturor och teammedlemmar.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Field>
              <Button
                type="button"
                onClick={handleStep2Continue}
                className="w-full"
              >
                Skapa min arbetsyta
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Field>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Tillbaka
              </button>
            </div>
          </div>
        </FieldGroup>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-lg w-full">
      <StepIndicator currentStep={3} totalSteps={3} />
      <div className="flex flex-col items-center gap-2 text-center mb-4">
        <h1 className="text-2xl font-bold">
          Låt oss skapa din arbetsyta
        </h1>
        <p className="text-muted-foreground text-sm">
          Fyll i informationen nedan för att komma igång
        </p>
      </div>
      <CreateWorkspaceForm userName={name} />
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
        >
          Tillbaka
        </button>
      </div>
    </div>
  );
}

