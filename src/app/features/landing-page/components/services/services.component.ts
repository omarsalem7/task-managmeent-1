import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, MatCardModule, CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  title: string = 'خدماتنا';
  titleImg: string = '/images/Vector.png';
  description: string = 'إليكم في هذا الجزء الخدمات التي تقدمها شركتنا لكم ';

  constructor(private router: Router) {}

  navToAuth() {
    this.router.navigate(['/auth/login']);
  }

  // بيانات الكروت
  cards: any[] = [
    {
      img: '/images/1.png',
      title: 'حوكـــــــــــــمة الشركـــــــــــات',
    },
    {
      img: '/images/4.png',
      title: 'العمــــــــــــــــل عن بعـــــــــــــد',
    },
    {
      img: '/images/5.png',
      title: 'الإشـــــــــــراف القانـــــــــــوني',
    },
    {
      img: '/images/6.png',
      title: 'خدمـــــــــــــــــة الاستشــــارات',
    },
  ];

  // البيانات المقابلة لكل كارت
  data = [
    {
      title: 'حوكمة الشركات',
      description:
        'شـــاملة فـــي الوثق لخدمـــات الأعمال، نقدم حلولا لحوكمة الشركات لتعزيز الشفافية والكفاءة. تشمل خدماتنـــا إعـــادة هيكلـــة الشـــركات، بناء السياســـات والإجـــراءات، وتدريـــب علـــى الحوكمة وفـــق أفضل الممارســـات العالمية، مما يضمن استدامة الأعمال وتحقيق التميز التشغيلي.',
      callToAction: 'مزيد من التفاصيل',
      bgImg: '/images/bgImg.png',
    },
    {
      title: 'العمل عن بعد',
      description:
        'شاملة لدعم وتطبيق نموذج العمل عن نقدم في الوثق حلولا بعد، مما يساعد الشركات على تعزيز مرونتها التشغيلية وتحسين كفاءة فرق العمل. نركز على تصميم وتطوير أنظمة متكاملة للعمل عن بعد تتماشى مع أفضل الممارسات العالمية، مع التأكد من الامتثال الكامل للقوانين واللوائح المحلية المعتمدة من وزارة الموارد البشرية. تشمل خدماتنا إعداد السياسات والإجراءات التي تدير عمليات العمل عن بعد، وتوفير أدوات التواصل والمتابعة لضمان ً عن تقديم الدعم التقني والتنظيمي استمرارية الإنتاجية، فضلا لتمكين الشركات من إدارة فرقها بكفاءة.',
      callToAction: 'مزيد من التفاصيل',
      bgImg: '/images/bgImg5.png',
    },
    {
      title: 'الإشراف القانوني',
      description:
        'في الوثق لخدمات الأعمال، نقدم خدمات إشراف قانوني متكاملة تهدف إلى تقديم دعم قانوني شامل ومستمر للشركات التي قد لا تمتلك إدارة قانونية داخلية. نعمل على تنظيم وتفعيل النظم القانونية الداخلية للشركة بما يضمن الامتثال الكامل للقوانين والأنظمة المحلية والدولية. يشمل ذلك إعداد وصياغة العقود القانونية، مراجعة اللوائح الداخلية، وتقديم الاستشارات القانونية المتخصصة في مختلف الجوانب التجارية.كما نقوم بمتابعة القضايا القانونية اليومية، وحل النزاعات المحتملة، وتقديم الدعم في التعامل مع الجهات القانونية والتنظيمية. تهدف خدماتنا إلى تقليل المخاطر القانونية وضمان الحماية القانونية الكاملة لأعمال الشركات، مما يتيح لها التركيز على أهدافها التشغيلية والاستراتيجية بثقة.',
      callToAction: 'مزيد من التفاصيل',
      bgImg: '/images/bgImg5.png',
    },
    {
      title: 'خدمة الاستشارات',
      description:
        'نطـــرح في الوثـــق لخدمات الأعمـــال خدمة الاستشـــارات المتخصصـــة التي تغطي مختلف جوانـــب الأعمال لضمان تحقيق التميز والاســـتدامة. تركز خدماتنا الاستشارية على تقديـــم حلول اســـتراتيجية في مجالات حوكمة الشـــركات والإشراف القانوني. نساعد الشركات على تحسين هياكلها التنظيمية، تطوير السياســـات والإجراءات، وتعزيز الامتثال للمعايير الدولية. مـــن خلال فريق مـــن الخبراء المتخصصيـــن، نضمن تقديم استشارات مهنية تستند إلى أفضل الممارسات العالمية، مما يســـاعد الشـــركات علـــى مواجهة التحديات، تحســـين الأداء، وتحقيـــق الأهـــداف بكفـــاءة وفعاليـــة. خدماتنـــا مصممة لتلبية احتياجات الشـــركات الكبرى والمتوســـطة والصغيـــرة، وتوفير الدعم الـــلازم لتحقيق نمو مســـتدام وتحسين القدرة التنافسية.',
      callToAction: 'مزيد من التفاصيل',
      bgImg: '/images/bgImg5.png',
    },
  ];

  // البيانات الافتراضية المعروضة
  selectedCard = 0;
  selectedTitle = this.data[0].title;
  selectedDescription = this.data[0].description;
  selectedCallToAction = this.data[0].callToAction;
  selectedBgImg = this.data[0].bgImg;

  // دالة لتحديث البيانات عند النقر على كارت
  updateContent(index: number) {
    this.selectedCard = index;
    this.selectedTitle = this.data[index].title;
    this.selectedDescription = this.data[index].description;
    this.selectedCallToAction = this.data[index].callToAction;
    this.selectedBgImg = this.data[index].bgImg;
  }
}
