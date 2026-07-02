import React from 'react';
import { 
  Cable, 
  Wind, 
  ToggleRight, 
  ShieldAlert, 
  Lightbulb, 
  Cpu, 
  Star, 
  Shield, 
  Check, 
  Phone, 
  ArrowRight, 
  ClipboardCheck, 
  Clock, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  User, 
  StarHalf, 
  MessageCircle, 
  AlertCircle, 
  Wrench, 
  Navigation, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Award,
  ThumbsUp
} from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export default function IconRenderer({ name, className = '', size }: IconRendererProps) {
  const iconProps = { className, size };

  switch (name) {
    case 'Cable':
      return <Cable {...iconProps} />;
    case 'Wind':
      return <Wind {...iconProps} />;
    case 'ToggleRight':
      return <ToggleRight {...iconProps} />;
    case 'ShieldAlert':
      return <ShieldAlert {...iconProps} />;
    case 'Lightbulb':
      return <Lightbulb {...iconProps} />;
    case 'Cpu':
      return <Cpu {...iconProps} />;
    case 'Star':
      return <Star {...iconProps} />;
    case 'Shield':
      return <Shield {...iconProps} />;
    case 'Check':
      return <Check {...iconProps} />;
    case 'Phone':
      return <Phone {...iconProps} />;
    case 'ArrowRight':
      return <ArrowRight {...iconProps} />;
    case 'ClipboardCheck':
      return <ClipboardCheck {...iconProps} />;
    case 'Clock':
      return <Clock {...iconProps} />;
    case 'MapPin':
      return <MapPin {...iconProps} />;
    case 'Calendar':
      return <Calendar {...iconProps} />;
    case 'CheckCircle':
      return <CheckCircle {...iconProps} />;
    case 'User':
      return <User {...iconProps} />;
    case 'StarHalf':
      return <StarHalf {...iconProps} />;
    case 'MessageCircle':
      return <MessageCircle {...iconProps} />;
    case 'AlertCircle':
      return <AlertCircle {...iconProps} />;
    case 'Wrench':
      return <Wrench {...iconProps} />;
    case 'Navigation':
      return <Navigation {...iconProps} />;
    case 'CheckCircle2':
      return <CheckCircle2 {...iconProps} />;
    case 'ChevronRight':
      return <ChevronRight {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'Award':
      return <Award {...iconProps} />;
    case 'ThumbsUp':
      return <ThumbsUp {...iconProps} />;
    default:
      return <Wrench {...iconProps} />;
  }
}
