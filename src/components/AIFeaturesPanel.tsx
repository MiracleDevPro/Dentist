import * as React from 'react';
import { Info } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFeatures } from '@/contexts/FeaturesContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import ExposureMaskingToggle from "@/components/ExposureMaskingToggle";
import { Slider } from "@/components/ui/slider";

interface AIFeaturesPanelProps {
  // Optional props can be added here if needed
}

const AIFeaturesPanel: React.FC<AIFeaturesPanelProps> = () => {
  const { features, toggleFeature, circleSizeSettings, updateCircleSizeSettings, exposureMaskSettings, updateExposureMaskSettings } = useFeatures();
  return (
    <Card className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md border-[#e6e7ea]">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-gray-800 manrope-light">AI Features</CardTitle>
      </CardHeader>
      <CardContent>
        {/* ALL AI Toggle */}
        <div className="py-2 flex justify-between items-center border-b border-[#e6e7ea]">
          <div>
            <span className="font-semibold text-gray-700">ALL AI</span>
            <span className="text-sm text-gray-700 ml-2">Controls all implemented features</span>
          </div>
          <Switch 
            id="all-ai" 
            className="data-[state=checked]:bg-gray-400 data-[state=unchecked]:bg-gray-200" 
            checked={features.aiMasterToggle}
            onCheckedChange={() => toggleFeature('aiMasterToggle')}
          />
        </div>
        
        {/* HSV Color Space */}
        <div className="py-3 flex justify-between items-center border-b border-[#e6e7ea]">
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium text-gray-700">HSV Color Space</span>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="inline-flex">
                    <Info className="w-4 h-4 ml-2 text-gray-700 cursor-pointer hover:text-gray-700" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-[#ECEDEF] text-gray-900 font-manrope border border-gray-300 shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-gray-500">HSV Color Space Analysis</DialogTitle>
                    <DialogDescription>
                      <div className="mt-4 space-y-4 text-left text-sm">
                        <div>
                          <h3 className="font-semibold text-gray-900">Enhanced Shade Family Detection</h3>
                          <p className="text-gray-700">
                            HSV's Hue component is particularly good at identifying the fundamental shade family of a tooth (A, B, C, or D in the VITA Classical system). It better distinguishes between yellowish (A series) and reddish-gray (D series) teeth.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900">Translucency Assessment</h3>
                          <p className="text-gray-700">
                            Saturation values help detect differences in tooth translucency and color intensity. This is crucial when differentiating between shades that have similar lightness but different translucency levels.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900">Combined Scoring System</h3>
                          <p className="text-gray-700">
                            When enabled, the app calculates an HSV delta (difference) between the analyzed tooth and reference shades. This HSV difference is combined with the traditional LAB delta-E using weighted averaging. The resulting score gives a more clinically relevant match than LAB measurements alone.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900">Confidence Scoring Adjustment</h3>
                          <p className="text-gray-700">
                            The confidence score calculation is enhanced when HSV is enabled. The system provides higher confidence when both LAB and HSV values closely match a reference shade.
                          </p>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end mt-4">
                    <DialogClose className="px-4 py-2 text-sm font-medium text-white bg-gray-300 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      Close
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
              <div className={`ml-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${features.useHSV ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                {features.useHSV ? 'Active' : 'Inactive'}
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-1">
              Enhanced shade matching using hue, saturation, and value color space
            </p>
          </div>
          <Switch 
            id="hsv-toggle" 
            className="data-[state=checked]:bg-gray-400 data-[state=unchecked]:bg-gray-200"
            checked={features.useHSV}
            onCheckedChange={() => toggleFeature('useHSV')}
          />
        </div>
        
        {/* Exposure Masking Feature */}
        <div className="py-3 flex justify-between items-center border-b border-gray-100">
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium text-gray-700">Exposure Masking</span>
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button type="button" className="ml-2 flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none" aria-label="Information about exposure masking">
        <Info className="w-4 h-4" />
      </button>
    </TooltipTrigger>
    <TooltipContent side="right" className="max-w-xs p-2">
      <div>
        <p className="font-medium text-sm mb-1">Exposure Masking</p>
        <p className="text-xs mb-1">
          Automatically detects and masks overexposed (bright) and underexposed (dark) areas in the image.
        </p>
        <ul className="text-xs list-disc pl-4">
          <li>Overexposed: RGB &gt; 245 (red overlay)</li>
          <li>Underexposed: RGB &lt; 25 (blue overlay)</li>
          <li>Masked pixels are excluded from color analysis</li>
        </ul>
      </div>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
<div className={`ml-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${features.useExposureMasking ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
  {features.useExposureMasking ? 'Active' : 'Inactive'}
</div>
            </div>
            <p className="text-sm text-gray-700 mt-1">
              Exclude over- and underexposed pixels from color analysis
            </p>
          </div>
          <ExposureMaskingToggle />
        </div>
        
        {/* Exposure Mask Intensity Slider - Only shown when masking is enabled */}
        {features.useExposureMasking && (
          <div className="py-3 pl-4 pr-2 flex flex-col border-b border-gray-100 bg-gray-50 rounded-md mt-1 mb-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Mask Intensity
              </label>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(exposureMaskSettings.maskIntensity * 100)}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-700">10%</span>
              <Slider
                value={[exposureMaskSettings.maskIntensity * 100]}
                min={10}
                max={100}
                step={2}
                className="flex-1 bg-gray-300"
                onValueChange={(values) => {
                  updateExposureMaskSettings({
                    maskIntensity: values[0] / 100
                  });
                }}
              />
              <span className="text-xs text-gray-700">100%</span>
            </div>
            <p className="text-xs text-gray-700 mt-1">
              Adjusts how aggressively masking is applied to over/underexposed areas
            </p>
          </div>
        )}

        {/* Circle Size Controls */}
        <div className="py-3 flex flex-col border-b border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-medium text-gray-700">Calibration Circle Size</span>
            </div>
            <span className="text-xs font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded">
              {Math.round(circleSizeSettings.calibrationCircleScale * 100)}%
            </span>
          </div>
          <Slider
            defaultValue={[circleSizeSettings.calibrationCircleScale * 100]}
            max={500}
            min={20}
            step={5}
            onValueChange={(values) => {
              const scale = values[0] / 100;
              updateCircleSizeSettings({ calibrationCircleScale: scale });
            }}
            className="my-1 bg-gray-300"
          />
          <p className="text-xs text-gray-700 mt-1">
            Adjust the size of calibration sampling circles (20% to 500%)
          </p>
        </div>

        {/* Analysis Circle Size Control */}
        <div className="py-3 flex flex-col border-b border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-medium text-gray-700">Analysis Circle Size</span>
            </div>
            <span className="text-xs font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded">
              {Math.round(circleSizeSettings.analysisCircleScale * 100)}%
            </span>
          </div>
          <Slider
            defaultValue={[circleSizeSettings.analysisCircleScale * 100]}
            max={500}
            min={20}
            step={5}
            onValueChange={(values) => {
              const scale = values[0] / 100;
              updateCircleSizeSettings({ analysisCircleScale: scale });
            }}
            className="my-1 bg-gray-300"
          />
          <p className="text-xs text-gray-700 mt-1">
            Adjust the size of tooth analysis sampling circle (20% to 500%)
          </p>
        </div>
        
        {/* Weighted Delta-E */}
        <div className="py-3 flex justify-between items-center border-b border-gray-100">
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium text-gray-700">Weighted Delta-E</span>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="inline-flex">
                    <Info className="w-4 h-4 ml-2 text-gray-700 cursor-pointer hover:text-gray-700" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-[#ECEDEF] text-gray-900 font-manrope border border-gray-300 shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-gray-500">Weighted Delta-E Analysis</DialogTitle>
                    <DialogDescription>
                      <div className="mt-4 space-y-4 text-left text-sm">
                        <div>
                          <h3 className="font-semibold text-gray-900">Adaptive Color Difference</h3>
                          <p className="text-gray-700">
                            Weighted Delta-E applies varying importance to different aspects of color measurement based on clinical relevance in tooth shade matching.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900">Perceptual Uniformity</h3>
                          <p className="text-gray-700">
                            Standard Delta-E treats all color differences equally, but human perception doesn't. Weighted Delta-E accounts for how we perceive different color variations in teeth.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900">Emphasis on Critical Areas</h3>
                          <p className="text-gray-700">
                            This feature gives higher weight to color differences in ranges that are most significant for dental applications, improving clinical relevance of the matches.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900">Confidence Enhancement</h3>
                          <p className="text-gray-700">
                            When enabled, the shade matching algorithm provides more reliable confidence scores by accounting for perceptual differences in dental color assessment.
                          </p>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end mt-4">
                    <DialogClose className="px-4 py-2 text-sm font-medium text-white bg-gray-300 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      Close
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
              <div className={`ml-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${features.useWeightedDeltaE ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                {features.useWeightedDeltaE ? 'Active' : 'Inactive'}
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-1">
              Uses perceptual weighting to improve LAB color difference calculations
            </p>
          </div>
          <Switch 
            id="weighted-delta-toggle" 
            className="data-[state=checked]:bg-gray-400 data-[state=unchecked]:bg-gray-200"
            checked={features.useWeightedDeltaE}
            onCheckedChange={() => toggleFeature('useWeightedDeltaE')}
          />
        </div>
        
        {/* Clinical Suggestions */}

 {/* Clinical Suggestions */}
        <div className="py-3 flex justify-between items-center border-b border-[#e6e7ea]">
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium text-gray-700">Clinical Layering Suggestions</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 ml-2 text-gray-700" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-2 text-sm bg-white border border-gray-200">
                    <p>Provides practical clinical guidance for layering enamel and dentine shades based on visual properties of the natural tooth.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className={`ml-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${features.useClinicalSuggestions ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                {features.useClinicalSuggestions ? 'Active' : 'Inactive'}
              </div>
            </div>
            <p className="text-sm text-gray-700">Get layering and blend recommendations for better shade matching</p>
          </div>
          <Switch 
            id="clinical-suggestions" 
            className="data-[state=checked]:bg-gray-400 data-[state=unchecked]:bg-gray-200" 
            checked={features.useClinicalSuggestions}
            onCheckedChange={() => toggleFeature('useClinicalSuggestions')}
          />
        </div>
        
      </CardContent>
    </Card>
  );
};

export default AIFeaturesPanel;
