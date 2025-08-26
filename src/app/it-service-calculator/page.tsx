
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import TranslatedText from '@/app/components/translated-text';
import { ArrowLeft, Calculator, Download, Mail } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

// --- Configuration Object for easy editing ---
const serviceConfig = {
  vatRate: 0.16, // 16%
  services: {
    web_development: {
      name: 'Web Development',
      baseRate: 500,
      unit: 'project',
      features: [
        { id: 'ui_design', name: 'UI/UX Design', price: 400 },
        { id: 'auth', name: 'User Authentication', price: 300 },
        { id: 'cms', name: 'CMS Integration', price: 350 },
        { id: 'ecommerce', name: 'E-commerce Functionality', price: 700 },
      ],
    },
    software_development: {
      name: 'Software Development',
      baseRate: 1000,
      unit: 'project',
      features: [
        { id: 'api_dev', name: 'Custom API Development', price: 800 },
        { id: 'db_design', name: 'Database Architecture', price: 600 },
        { id: 'third_party_integration', name: 'Third-party Integrations', price: 500 },
      ],
    },
    mobile_app_development: {
      name: 'Mobile App Development',
      baseRate: 1200,
      unit: 'project',
      features: [
        { id: 'ios', name: 'iOS App', price: 1000 },
        { id: 'android', name: 'Android App', price: 1000 },
        { id: 'push_notifications', name: 'Push Notifications', price: 250 },
        { id: 'in_app_purchases', name: 'In-App Purchases', price: 400 },
      ],
    },
    prototypes: {
      name: 'Prototypes (Web, Mobile, System Demos)',
      baseRate: 300,
      unit: 'prototype',
      features: [
        { id: 'interactive_mockup', name: 'Interactive Mockup', price: 200 },
        { id: 'basic_backend', name: 'Basic Backend Logic', price: 250 },
      ],
    },
    full_systems: {
      name: 'Full Systems (End-to-End Solutions)',
      baseRate: 5000,
      unit: 'system',
      features: [
        { id: 'cloud_hosting', name: 'Cloud Hosting Setup', price: 500 },
        { id: 'ci_cd', name: 'CI/CD Pipeline', price: 750 },
        { id: 'ongoing_support', name: 'Ongoing Support Contract', price: 1500 },
      ],
    },
    it_support: {
      name: 'IT Support / Maintenance',
      baseRate: 50,
      unit: 'hour',
      features: [],
    },
    other: {
      name: 'Other (Custom)',
      baseRate: 60,
      unit: 'hour',
      features: [],
    },
  },
  slaTiers: {
    standard: {
      name: 'Standard',
      multiplier: 1,
      description: 'Business hours support (8-12 working days)',
    },
    priority: {
      name: 'Priority',
      multiplier: 1.5,
      description: 'Extended hours & faster response (3-7 working days)',
    },
    after_hours: {
      name: 'After-Hours',
      multiplier: 2,
      description: '24/7 support for critical issues (1-2 working days)',
    },
  },
};
// --- End Configuration ---

type ServiceId = keyof typeof serviceConfig.services;
type SlaId = keyof typeof serviceConfig.slaTiers;

export default function ItServiceCalculatorPage() {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<ServiceId>('web_development');
  const [quantity, setQuantity] = useState(1);
  const [customServiceName, setCustomServiceName] = useState('');
  const [selectedSla, setSelectedSla] = useState<SlaId>('standard');
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>({});
  const [totalCost, setTotalCost] = useState({ subtotal: 0, vat: 0, total: 0 });

  const currentService = serviceConfig.services[selectedService];

  useEffect(() => {
    const slaMultiplier = serviceConfig.slaTiers[selectedSla].multiplier;
    const baseForQuantity = currentService.baseRate * quantity;

    const featuresCost = currentService.features.reduce((acc, feature) => {
      if (selectedFeatures[feature.id]) {
        return acc + feature.price;
      }
      return acc;
    }, 0);

    const subtotalBeforeSla = baseForQuantity + featuresCost;
    const finalSubtotal = subtotalBeforeSla * slaMultiplier;

    const vatAmount = finalSubtotal * serviceConfig.vatRate;
    const finalTotal = finalSubtotal + vatAmount;

    setTotalCost({
      subtotal: finalSubtotal,
      vat: vatAmount,
      total: finalTotal,
    });
  }, [selectedService, quantity, selectedSla, selectedFeatures, currentService]);

  const handleServiceChange = (value: string) => {
    setSelectedService(value as ServiceId);
    setQuantity(1); // Reset quantity
    setSelectedFeatures({}); // Reset features
  };

  const handleFeatureChange = (featureId: string) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId],
    }));
  };
  
  const getQuoteText = (forUrl = false) => {
    const nl = forUrl ? '%0A' : '\n';
    let serviceName = currentService.name;
    if (selectedService === 'other' && customServiceName) {
      serviceName = `${customServiceName} (Custom)`;
    }

    const featureLines = currentService.features
      .filter(f => selectedFeatures[f.id])
      .map(f => `- ${f.name}`)
      .join(nl);

    return [
      `*Quote Summary*`,
      `Service: ${serviceName}`,
      `Quantity: ${quantity} ${currentService.unit}(s)`,
      ...(featureLines ? [`Features:${nl}${featureLines}`] : []),
      `SLA: ${serviceConfig.slaTiers[selectedSla].name}`,
      `------------------`,
      `Subtotal: $${totalCost.subtotal.toFixed(2)}`,
      `VAT (16%): $${totalCost.vat.toFixed(2)}`,
      `*Total: $${totalCost.total.toFixed(2)}*`,
    ].join(nl);
  };
  
  const generatePdfQuote = () => {
    try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        let y = 20;

        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('IT Service Quote', pageWidth / 2, y, { align: 'center' });
        y += 15;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, y);
        y += 15;

        doc.setLineWidth(0.5);
        doc.line(15, y, pageWidth - 15, y);
        y += 10;

        const addLine = (label: string, value: string) => {
          doc.setFont('helvetica', 'bold');
          doc.text(label, 15, y);
          doc.setFont('helvetica', 'normal');
          doc.text(value, 70, y);
          y += 8;
        };
        
        let serviceName = currentService.name;
        if (selectedService === 'other' && customServiceName) {
          serviceName = `${customServiceName} (Custom)`;
        }

        addLine('Service:', serviceName);
        addLine('Quantity:', `${quantity} ${currentService.unit}(s)`);
        addLine('Service Level (SLA):', serviceConfig.slaTiers[selectedSla].name);
        y += 5;

        const selectedFeatureList = currentService.features.filter(f => selectedFeatures[f.id]);
        if (selectedFeatureList.length > 0) {
            doc.setFont('helvetica', 'bold');
            doc.text('Selected Features:', 15, y);
            y += 8;
            doc.setFont('helvetica', 'normal');
            selectedFeatureList.forEach(feature => {
                doc.text(`- ${feature.name}`, 20, y);
                y += 6;
            });
            y+= 4;
        }
        
        doc.line(15, y, pageWidth - 15, y);
        y += 10;

        const addCostLine = (label: string, value: string) => {
            doc.setFont('helvetica', 'normal');
            doc.text(label, pageWidth - 65, y, { align: 'right' });
            doc.setFont('helvetica', 'bold');
            doc.text(value, pageWidth - 15, y, { align: 'right' });
            y += 8;
        }

        addCostLine('Subtotal:', `$${totalCost.subtotal.toFixed(2)}`);
        addCostLine(`VAT (${serviceConfig.vatRate * 100}%):`, `$${totalCost.vat.toFixed(2)}`);
        y += 2;
        doc.setLineWidth(0.2);
        doc.line(pageWidth - 68, y, pageWidth - 15, y);
        y += 8;
        
        doc.setFontSize(14);
        addCostLine('Total Estimate:', `$${totalCost.total.toFixed(2)}`);
        
        doc.save(`Quote-${serviceName.replace(/\\s/g, '_')}.pdf`);
    } catch(error) {
        console.error("Failed to generate PDF:", error);
        toast({
            variant: "destructive",
            title: "PDF Generation Failed",
            description: "There was an error creating the PDF. Please try again.",
        });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 min-h-screen">
      <header className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <TranslatedText text="Back to Home" />
          </Link>
        </Button>
        <div className="flex items-center space-x-3">
          <Calculator className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-primary">
            <TranslatedText text="IT Service Quotation Calculator" />
          </h1>
        </div>
      </header>

      <div className="grid md:grid-cols-5 gap-8">
        {/* --- Calculator Form --- */}
        <div className="md:col-span-3">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle><TranslatedText text="Configure Your Service" /></CardTitle>
              <CardDescription><TranslatedText text="Select a service and adjust the options to get a cost estimate." /></CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service-select"><TranslatedText text="Service" /></Label>
                <Select value={selectedService} onValueChange={handleServiceChange}>
                  <SelectTrigger id="service-select">
                    <SelectValue placeholder="Select a service..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(serviceConfig.services).map(([id, { name }]) => (
                      <SelectItem key={id} value={id}><TranslatedText text={name} /></SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Service Name */}
              {selectedService === 'other' && (
                <div className="space-y-2">
                  <Label htmlFor="custom-service-name"><TranslatedText text="Custom Service Name" /></Label>
                  <Input
                    id="custom-service-name"
                    value={customServiceName}
                    onChange={(e) => setCustomServiceName(e.target.value)}
                    placeholder="e.g., Data Analysis Pipeline"
                  />
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity-input">
                  <TranslatedText text={`Number of ${currentService.unit}s`} />
                </Label>
                <Input
                  id="quantity-input"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
              </div>

              {/* Features Checkboxes */}
              {currentService.features.length > 0 && (
                <div className="space-y-2">
                  <Label><TranslatedText text="Additional Features" /></Label>
                  <div className="space-y-2 rounded-md border p-4">
                     {currentService.features.map(feature => (
                       <div key={feature.id} className="flex items-center space-x-2">
                         <Checkbox
                           id={`feature-${feature.id}`}
                           checked={!!selectedFeatures[feature.id]}
                           onCheckedChange={() => handleFeatureChange(feature.id)}
                         />
                         <Label htmlFor={`feature-${feature.id}`} className="font-normal flex justify-between w-full">
                           <TranslatedText text={feature.name} />
                           <span className="text-muted-foreground text-xs">+${feature.price}</span>
                         </Label>
                       </div>
                     ))}
                  </div>
                </div>
              )}
              
              {/* SLA Tiers */}
              <div className="space-y-2">
                <Label><TranslatedText text="Priority / Service Level (SLA)" /></Label>
                <RadioGroup value={selectedSla} onValueChange={(value) => setSelectedSla(value as SlaId)} className="rounded-md border p-4 space-y-2">
                  {Object.entries(serviceConfig.slaTiers).map(([id, { name, description }]) => (
                    <div key={id} className="flex items-center space-x-2">
                      <RadioGroupItem value={id} id={`sla-${id}`} />
                      <Label htmlFor={`sla-${id}`} className="font-normal w-full">
                        <div className="flex justify-between">
                            <TranslatedText text={name} />
                            <span className="text-muted-foreground text-xs">({serviceConfig.slaTiers[id as SlaId].multiplier}x cost)</span>
                        </div>
                        <p className="text-xs text-muted-foreground"><TranslatedText text={description} /></p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- Quote Summary --- */}
        <div className="md:col-span-2">
          <Card className="shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle><TranslatedText text="Estimated Quote" /></CardTitle>
              <CardDescription><TranslatedText text="This is an estimate. Final pricing may vary." /></CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span><TranslatedText text="Subtotal" /></span>
                <span>${totalCost.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span><TranslatedText text={`VAT (${serviceConfig.vatRate * 100}%)`} /></span>
                <span>${totalCost.vat.toFixed(2)}</span>
              </div>
              <div className="border-t border-dashed my-2"></div>
              <div className="flex justify-between text-2xl font-bold text-primary">
                <span><TranslatedText text="Total" /></span>
                <span>${totalCost.total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button onClick={generatePdfQuote} className="w-full">
                <Download className="mr-2" /> <TranslatedText text="Download Quote (PDF)" />
              </Button>
              <div className="flex w-full gap-3">
                <Button asChild variant="outline" className="w-full">
                  <a href={`https://wa.me/?text=${getQuoteText(true)}`} target="_blank" rel="noopener noreferrer">
                    <WhatsappIcon className="mr-2" /> <TranslatedText text="Share" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={`mailto:?subject=IT Service Quote&body=${getQuoteText(true)}`}>
                    <Mail className="mr-2" /> <TranslatedText text="Email" />
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

    