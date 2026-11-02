import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main() => runApp(const EyepekApp());

final appHindi = ValueNotifier<bool>(false);
String _t(String english, String hindi) => appHindi.value ? hindi : english;

const navy = Color(0xFF073B78);
const blue = Color(0xFF0865C8);
const pale = Color(0xFFEAF4FF);
const ink = Color(0xFF102B50);

class ServiceInfo {
  final String title, detail, titleHi, detailHi;
  final IconData icon;
  const ServiceInfo(this.title, this.detail, this.icon, this.titleHi, this.detailHi);
}
const services = <ServiceInfo>[
  ServiceInfo('Admission Guidance', 'Compare course options, ask the college about eligibility and fees, prepare a document checklist, and understand application steps. The college makes the admission decision.', Icons.school, 'प्रवेश मार्गदर्शन', 'कोर्स विकल्प समझें, कॉलेज से पात्रता और फीस पूछें, दस्तावेज़ सूची बनाएँ और आवेदन के चरण जानें। प्रवेश का निर्णय कॉलेज करता है।'),
  ServiceInfo('College Affiliation', 'Affiliation is a university’s formal relationship with a college for specified courses. EYEPEK helps organise the process and records; the university decides.', Icons.account_balance, 'कॉलेज संबद्धता', 'संबद्धता किसी विश्वविद्यालय और कॉलेज का तय कोर्सों के लिए औपचारिक संबंध है। EYEPEK प्रक्रिया और रिकॉर्ड व्यवस्थित करने में मदद करता है; निर्णय विश्वविद्यालय का होता है।'),
  ServiceInfo('AICTE Documentation', 'Where regulations apply, AICTE is a separate approval process. EYEPEK can help organise records and paperwork; the authority reviews and decides.', Icons.verified_outlined, 'AICTE दस्तावेज़', 'जहाँ नियम लागू हों, AICTE की मंज़ूरी अलग प्रक्रिया है। EYEPEK रिकॉर्ड और कागज़ात व्यवस्थित करने में मदद करता है; निर्णय प्राधिकरण का होता है।'),
  ServiceInfo('Documents & Compliance', 'Make a preparation checklist, arrange records, and check what the college or authority asks for. Requirements differ by course and institution.', Icons.description_outlined, 'दस्तावेज़ और अनुपालन', 'तैयारी की सूची बनाएँ, रिकॉर्ड व्यवस्थित करें और कॉलेज या प्राधिकरण की माँगी जानकारी जाँचें। ज़रूरतें कोर्स और संस्थान के अनुसार बदलती हैं।'),
  ServiceInfo('Renewals & Reporting', 'Guidance with periodic renewals, reporting and document preparation.', Icons.sync, 'नवीनीकरण और रिपोर्टिंग', 'समय-समय पर नवीनीकरण, रिपोर्ट और दस्तावेज़ मार्गदर्शन।'),
  ServiceInfo('Consultation', 'Speak with the EYEPEK team about your requirements.', Icons.support_agent, 'परामर्श', 'अपनी ज़रूरतों के बारे में EYEPEK टीम से बात करें।'),
  ServiceInfo('Computer & IT Support', 'Computer, software, networking, CCTV and maintenance support.', Icons.computer, 'कंप्यूटर और IT सहायता', 'कंप्यूटर, सॉफ्टवेयर, नेटवर्क, CCTV और रखरखाव सहायता।'),
];

class EyepekApp extends StatelessWidget {
  const EyepekApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
    title: 'EYEPEK',
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(seedColor: blue),
      scaffoldBackgroundColor: const Color(0xFFF4F7FB),
      appBarTheme: const AppBarTheme(backgroundColor: Colors.white, foregroundColor: ink, elevation: 0),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(13), borderSide: const BorderSide(color: Color(0xFFDCE5EF))),
        enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(13), borderSide: const BorderSide(color: Color(0xFFDCE5EF))),
        focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(13), borderSide: const BorderSide(color: blue, width: 1.5)),
      ),
    ),
    home: ValueListenableBuilder<bool>(valueListenable: appHindi, builder: (context, hi, _) => Shell(hindi: hi, onHindiChanged: (value) => appHindi.value = value)),
  );
}

class Brand extends StatelessWidget {
  final double size;
  const Brand({super.key, this.size = 40});
  @override
  Widget build(BuildContext context) => Row(mainAxisSize: MainAxisSize.min, children: [
    ClipRRect(borderRadius: BorderRadius.circular(size * .22), child: Image.asset('assets/eyepek-app-icon.png', width: size, height: size, fit: BoxFit.cover)),
    const SizedBox(width: 9),
    const Text('EYEPEK', style: TextStyle(color: navy, fontSize: 23, fontWeight: FontWeight.w900, letterSpacing: .2)),
  ]);
}

class Shell extends StatefulWidget {
  final bool hindi;
  final ValueChanged<bool> onHindiChanged;
  const Shell({super.key, required this.hindi, required this.onHindiChanged});
  @override
  State<Shell> createState() => _ShellState();
}
class _ShellState extends State<Shell> {
  int tab = 0;
  void go(int value) => setState(() => tab = value);
  @override
  Widget build(BuildContext context) {
    final pages = [Home(go: go), ServicesPage(go: go), CoursesPage(), EnquiryPage(), MorePage(hindi: widget.hindi, onHindiChanged: widget.onHindiChanged)];
    return Scaffold(
      body: IndexedStack(index: tab, children: pages),
      bottomNavigationBar: NavigationBar(
        selectedIndex: tab, onDestinationSelected: go,
        destinations: [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: _t('Home', 'होम')),
          NavigationDestination(icon: Icon(Icons.grid_view_outlined), selectedIcon: Icon(Icons.grid_view), label: _t('Services', 'सेवाएँ')),
          NavigationDestination(icon: Icon(Icons.menu_book_outlined), selectedIcon: Icon(Icons.menu_book), label: _t('Courses', 'कोर्स')),
          NavigationDestination(icon: Icon(Icons.chat_bubble_outline), selectedIcon: Icon(Icons.chat_bubble), label: _t('Enquiry', 'पूछताछ')),
          NavigationDestination(icon: Icon(Icons.more_horiz), label: _t('More', 'और')),
        ],
      ),
    );
  }
}

class Home extends StatelessWidget {
  final ValueChanged<int> go;
  const Home({super.key, required this.go});
  @override
  Widget build(BuildContext context) => CustomScrollView(slivers: [
    SliverAppBar(pinned: true, title: const Brand(), actions: [IconButton(tooltip: _t("Contact EYEPEK", "EYEPEK से संपर्क करें"), onPressed: () => go(4), icon: const Icon(Icons.call_outlined))]),
    SliverToBoxAdapter(child: Container(
      margin: const EdgeInsets.fromLTRB(16, 16, 16, 8), padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(borderRadius: BorderRadius.circular(24), gradient: const LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [navy, Color(0xFF0874D1)])),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          ClipRRect(borderRadius: BorderRadius.circular(13), child: Image.asset('assets/eyepek-app-icon.png', width: 48, height: 48)),
          const SizedBox(width: 10), const Text('EYEPEK', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 18, letterSpacing: 1)),
        ]),
        const SizedBox(height: 22),
        Text(_t("ADMISSIONS • AFFILIATION • DOCUMENTS", "प्रवेश • संबद्धता • दस्तावेज़"), style: TextStyle(color: Color(0xFFFFC58A), fontSize: 10, letterSpacing: .7, fontWeight: FontWeight.bold)),
        const SizedBox(height: 10),
        Text(_t("Education guidance,\nmade clearer.", "शिक्षा का मार्गदर्शन,\nअब और आसान।"), style: TextStyle(color: Colors.white, fontSize: 29, height: 1.15, fontWeight: FontWeight.w800)),
        const SizedBox(height: 10),
        Text(_t("Get practical guidance for college admissions, affiliation processes and AICTE related documentation.", "कॉलेज प्रवेश, संबद्धता प्रक्रिया और AICTE से जुड़े दस्तावेज़ों पर उपयोगी मार्गदर्शन पाएँ।"), style: TextStyle(color: Colors.white, height: 1.5)),
        const SizedBox(height: 18),
        FilledButton.icon(onPressed: () => go(3), style: FilledButton.styleFrom(backgroundColor: Colors.white, foregroundColor: navy), icon: const Icon(Icons.chat_outlined), label: Text(_t("Talk to our team", "हमारी टीम से बात करें"))),
      ]),
    )),
    SliverToBoxAdapter(child: _heading(_t('How EYEPEK can help', 'EYEPEK कैसे मदद करता है'), () => go(1))),
    SliverPadding(padding: const EdgeInsets.symmetric(horizontal: 16), sliver: SliverGrid.count(
      crossAxisCount: 2, crossAxisSpacing: 11, mainAxisSpacing: 11, childAspectRatio: 1.48,
      children: services.take(4).map((s) => _serviceTile(s, () => go(1))).toList(),
    )),
    SliverToBoxAdapter(child: _heading(_t('Explore courses', 'कोर्स देखें'), () => go(2))),
    SliverToBoxAdapter(child: SizedBox(height: 108, child: ListView(
      scrollDirection: Axis.horizontal, padding: const EdgeInsets.symmetric(horizontal: 16),
      children: const [_CourseChip('BBA'), _CourseChip('BCA'), _CourseChip('MBA'), _CourseChip('MCA'), _CourseChip('ANM'), _CourseChip('GNM'), _CourseChip('B.Sc. Nursing')],
    ))),
    SliverToBoxAdapter(child: Padding(padding: const EdgeInsets.fromLTRB(16, 16, 16, 24), child: _notice())),
  ]);
}
Widget _heading(String title, VoidCallback tap) => Padding(
  padding: const EdgeInsets.fromLTRB(18, 20, 18, 12),
  child: Row(children: [Expanded(child: Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: ink))), TextButton(onPressed: tap, child: Text(_t('See all', 'सभी देखें')))]),
);
Widget _serviceTile(ServiceInfo item, VoidCallback tap) => Material(
  color: Colors.white, borderRadius: BorderRadius.circular(17),
  child: InkWell(onTap: tap, borderRadius: BorderRadius.circular(17), child: Container(
    padding: const EdgeInsets.all(13),
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(17), border: Border.all(color: const Color(0xFFE5ECF4))),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.center, children: [
      CircleAvatar(radius: 19, backgroundColor: pale, child: Icon(item.icon, color: navy, size: 21)),
      const SizedBox(height: 9),
      Text(_t(item.title, item.titleHi), style: const TextStyle(color: ink, fontSize: 12, fontWeight: FontWeight.w800)),
      const SizedBox(height: 3), Text(_t("Learn more  ›", "और जानें  ›"), style: TextStyle(color: blue, fontSize: 10, fontWeight: FontWeight.w600)),
    ]),
  )),
);
class _CourseChip extends StatelessWidget {
  final String name;
  const _CourseChip(this.name);
  @override
  Widget build(BuildContext context) => Container(
    width: 102, margin: const EdgeInsets.only(right: 10), padding: const EdgeInsets.all(13),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: const Color(0xFFE5ECF4))),
    child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      const Icon(Icons.menu_book_outlined, color: blue, size: 27), const SizedBox(height: 6),
      Text(name, textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.w800, color: ink, fontSize: 12)),
    ]),
  );
}
Widget _notice() => Container(
  padding: const EdgeInsets.all(14),
  decoration: BoxDecoration(color: const Color(0xFFFFF6E9), borderRadius: BorderRadius.circular(16), border: Border.all(color: const Color(0xFFFFE1B8))),
  child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
    Icon(Icons.info_outline, color: Color(0xFF9A5A00), size: 19), SizedBox(width: 9),
    Expanded(child: Text(_t("Course availability, eligibility and approvals are decided by the relevant institutions and authorities. EYEPEK provides guidance and documentation support.", "कोर्स की उपलब्धता, पात्रता और मंज़ूरी संबंधित संस्थान तय करते हैं। EYEPEK मार्गदर्शन और दस्तावेज़ सहायता देता है।"), style: TextStyle(color: ink, fontSize: 11, height: 1.45))),
  ]),
);

class ServicesPage extends StatelessWidget {
  final ValueChanged<int> go;
  const ServicesPage({super.key, required this.go});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: Text(_t("Our Services", "हमारी सेवाएँ"), style: TextStyle(fontWeight: FontWeight.w800))),
    body: ListView(padding: const EdgeInsets.all(16), children: [
      Text(_t("Guidance and support, in the order people usually need it.", "ज़रूरत के क्रम में मार्गदर्शन और सहायता।"), style: TextStyle(color: Colors.blueGrey)),
      const SizedBox(height: 14),
      for (final item in services)
        Card(elevation: 0, color: Colors.white, margin: const EdgeInsets.only(bottom: 10), child: ListTile(
          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 5),
          leading: CircleAvatar(backgroundColor: pale, child: Icon(item.icon, color: navy)),
          title: Text(_t(item.title, item.titleHi), style: const TextStyle(fontWeight: FontWeight.w800, color: ink, fontSize: 14)),
          subtitle: Padding(padding: const EdgeInsets.only(top: 4), child: Text(_t(item.detail, item.detailHi), style: const TextStyle(fontSize: 12, height: 1.35))),
          trailing: const Icon(Icons.chevron_right, color: blue),
          onTap: () => _serviceSheet(context, item, () => go(3)),
        )),
      _notice(),
    ]),
  );
}
void _serviceSheet(BuildContext context, ServiceInfo item, VoidCallback enquire) => showModalBottomSheet<void>(
  context: context, showDragHandle: true, builder: (sheet) => Padding(
    padding: const EdgeInsets.fromLTRB(22, 8, 22, 28),
    child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
      CircleAvatar(radius: 25, backgroundColor: pale, child: Icon(item.icon, color: navy, size: 27)),
      const SizedBox(height: 14),
      Text(_t(item.title, item.titleHi), style: const TextStyle(fontSize: 21, fontWeight: FontWeight.bold, color: ink)),
      const SizedBox(height: 8), Text(_t(item.detail, item.detailHi)), const SizedBox(height: 18),
      FilledButton.icon(onPressed: () { Navigator.pop(sheet); enquire(); }, icon: const Icon(Icons.chat_outlined), label: Text(_t("Ask about this service", "इस सेवा के बारे में पूछें"))),
    ]),
  ),
);

class CoursesPage extends StatelessWidget {
  const CoursesPage({super.key});
  static const courses = [
    ('BBA', 'Business administration', 'Undergraduate', 'Management, marketing, finance and organisations.', 'व्यवसाय, प्रबंधन, मार्केटिंग और वित्त की बुनियाद।', 'स्नातक', 'संस्थानों के कामकाज की बुनियादी समझ।'),
    ('BCA', 'Computer applications', 'Undergraduate', 'Programming, software concepts and digital systems.', 'कंप्यूटर एप्लिकेशन', 'स्नातक', 'प्रोग्रामिंग, सॉफ्टवेयर और डिजिटल सिस्टम की बुनियाद।'),
    ('ANM', 'Nursing', 'Undergraduate', 'Nursing and community health. Check current eligibility and recognition.', 'नर्सिंग', 'स्नातक', 'नर्सिंग और सामुदायिक स्वास्थ्य। पात्रता व मान्यता जाँचें।'),
    ('GNM', 'Nursing', 'Undergraduate', 'General nursing and patient-care foundations. Confirm requirements.', 'नर्सिंग', 'स्नातक', 'सामान्य नर्सिंग और रोगी देखभाल। आवश्यकताएँ पक्की करें।'),
    ('B.Sc. Nursing', 'Nursing', 'Undergraduate', 'Health sciences and clinical nursing study.', 'नर्सिंग', 'स्नातक', 'स्वास्थ्य विज्ञान और क्लिनिकल नर्सिंग अध्ययन।'),
    ('MBA', 'Business administration', 'Postgraduate', 'Advanced study in management and leadership.', 'व्यवसाय प्रबंधन', 'स्नातकोत्तर', 'प्रबंधन और नेतृत्व का उन्नत अध्ययन।'),
    ('MCA', 'Computer applications', 'Postgraduate', 'Advanced study in computing and software applications.', 'कंप्यूटर एप्लिकेशन', 'स्नातकोत्तर', 'कंप्यूटिंग और सॉफ्टवेयर अनुप्रयोगों का उन्नत अध्ययन।'),
  ];
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: Text(_t("Explore Courses", "कोर्स विकल्प"), style: TextStyle(fontWeight: FontWeight.w800))),
    body: ListView(padding: const EdgeInsets.all(16), children: [
      Text(_t("Tell us what you are interested in and we can guide you on available options.", "अपनी रुचि बताएँ; हम उपलब्ध विकल्प समझने में मदद करेंगे।"), style: TextStyle(color: Colors.blueGrey, height: 1.45)),
      const SizedBox(height: 14),
      for (final course in courses)
        Card(elevation: 0, color: Colors.white, margin: const EdgeInsets.only(bottom: 9), child: ListTile(
          leading: Container(width: 52, height: 52, decoration: BoxDecoration(color: pale, borderRadius: BorderRadius.circular(13)), child: const Icon(Icons.menu_book, color: navy)),
          title: Text(course.$1, style: const TextStyle(fontWeight: FontWeight.w800, color: ink)),
          subtitle: Text(_t(course.$4 + '\n' + course.$2 + ' • ' + course.$3, course.$7 + '\n' + course.$5 + ' • ' + course.$6), style: const TextStyle(height: 1.4)),
          trailing: const Icon(Icons.arrow_forward_ios, size: 15, color: blue),
          onTap: () => _openWhatsApp(context, 'Hello EYEPEK, I would like to know about ' + course.$1 + '.'),
        )),
      _notice(),
    ]),
  );
}

class EnquiryPage extends StatefulWidget {
  const EnquiryPage({super.key});
  @override
  State<EnquiryPage> createState() => _EnquiryPageState();
}
class _EnquiryPageState extends State<EnquiryPage> {
  final formKey = GlobalKey<FormState>();
  final name = TextEditingController(), phone = TextEditingController(), email = TextEditingController(), interest = TextEditingController();
  String service = services.first.title;
  @override
  void dispose() { name.dispose(); phone.dispose(); email.dispose(); interest.dispose(); super.dispose(); }

  Widget field(String label, TextEditingController controller, {String? hint, bool required = false, TextInputType keyboard = TextInputType.text}) => Padding(
    padding: const EdgeInsets.only(bottom: 13),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: ink)),
      const SizedBox(height: 6),
      TextFormField(controller: controller, keyboardType: keyboard, decoration: InputDecoration(hintText: hint ?? label), validator: (value) {
        if (required && (value == null || value.trim().isEmpty)) return _t('Please enter ', 'कृपया भरें: ') + label;
        if (keyboard == TextInputType.phone && value != null && value.trim().length < 10) return _t('Please enter a valid phone number', 'सही फ़ोन नंबर दर्ज करें');
        return null;
      }),
    ]),
  );

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: Text(_t("Talk to EYEPEK", "EYEPEK से बात करें"), style: TextStyle(fontWeight: FontWeight.w800))),
    body: Form(key: formKey, child: ListView(padding: const EdgeInsets.all(17), children: [
      Container(padding: const EdgeInsets.all(16), decoration: BoxDecoration(color: pale, borderRadius: BorderRadius.circular(17)), child: Row(children: [
        const Icon(Icons.chat_outlined, color: navy, size: 27), const SizedBox(width: 11),
        Expanded(child: Text(_t("Share a few details. WhatsApp will open with your message ready to send.", "कुछ जानकारी दें। WhatsApp में संदेश तैयार होगा; भेजने से पहले उसे देख लें।"), style: TextStyle(color: ink, fontSize: 13, height: 1.4))),
      ])),
      const SizedBox(height: 18),
      field(_t('Name', 'नाम'), name, hint: _t('Your name', 'अपना नाम लिखें'), required: true),
      field(_t('Mobile number', 'मोबाइल नंबर'), phone, hint: _t('Your phone number', 'अपना मोबाइल नंबर लिखें'), required: true, keyboard: TextInputType.phone),
      field(_t('Email (optional)', 'ईमेल (ज़रूरी नहीं)'), email, hint: _t('Your email address', 'अपना ईमेल लिखें'), keyboard: TextInputType.emailAddress),
      Text(_t("What do you need help with?", "आपको किस बारे में मदद चाहिए?"), style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: ink)),
      const SizedBox(height: 6),
      DropdownButtonFormField<String>(initialValue: service, isExpanded: true, items: services.map((s) => DropdownMenuItem(value: s.title, child: Text(_t(s.title, s.titleHi), overflow: TextOverflow.ellipsis))).toList(), onChanged: (value) { if (value != null) setState(() => service = value); }),
      const SizedBox(height: 13),
      field(_t('Course or other details', 'कोर्स या अन्य जानकारी'), interest, hint: _t('For example: BCA, affiliation, document help', 'जैसे: BCA, संबद्धता या दस्तावेज़ सहायता')),
      const SizedBox(height: 5),
      SizedBox(height: 52, child: FilledButton.icon(onPressed: () {
        if (!formKey.currentState!.validate()) return;
        final message = (appHindi.value ? 'नमस्ते EYEPEK, मुझे इस विषय में मदद चाहिए: ' : 'Hello EYEPEK, I need help with: ') + _t(service, services.firstWhere((item) => item.title == service).titleHi) +
          '\n' + _t('Name', 'नाम') + ': ' + name.text.trim() + '\n' + _t('Mobile', 'मोबाइल') + ': ' + phone.text.trim() +
          '\n' + _t('Email', 'ईमेल') + ': ' + email.text.trim() + '\n' + _t('Details', 'जानकारी') + ': ' + interest.text.trim();
        _openWhatsApp(context, message);
      }, icon: const Icon(Icons.send), label: Text(_t("Continue on WhatsApp", "WhatsApp पर आगे बढ़ें")))),
      const SizedBox(height: 13),
      Text(_t("WhatsApp opens on your device. Review the message and press Send to contact us.", "आपके डिवाइस पर WhatsApp खुलेगा। संदेश देखकर हमसे संपर्क करने के लिए Send दबाएँ।"), textAlign: TextAlign.center, style: TextStyle(color: Colors.blueGrey, fontSize: 11)),
    ])),
  );
}

class MorePage extends StatelessWidget {
  final bool hindi;
  final ValueChanged<bool> onHindiChanged;
  const MorePage({super.key, required this.hindi, required this.onHindiChanged});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Brand()),
    body: ListView(padding: const EdgeInsets.all(16), children: [
      Card(elevation: 0, child: Padding(padding: const EdgeInsets.all(16), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(_t('App language', 'ऐप की भाषा'), style: const TextStyle(fontWeight: FontWeight.w800, color: ink)),
        const SizedBox(height: 10),
        SegmentedButton<bool>(segments: const [ButtonSegment(value: false, label: Text('English')), ButtonSegment(value: true, label: Text('हिंदी'))], selected: {hindi}, onSelectionChanged: (value) => onHindiChanged(value.first)),
      ]))),
      Container(padding: const EdgeInsets.all(18), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(_t("About EYEPEK", "EYEPEK के बारे में"), style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: ink)),
        SizedBox(height: 8),
        Text(_t("Education service and guidance for students and institutions, including admissions, college affiliation processes and document support.", "छात्रों और संस्थानों के लिए शिक्षा मार्गदर्शन—प्रवेश, कॉलेज संबद्धता प्रक्रिया और दस्तावेज़ सहायता सहित।"), style: TextStyle(height: 1.5, color: Colors.blueGrey)),
      ])),
      const SizedBox(height: 14),
      _moreTile(context, Icons.chat, 'WhatsApp', 'Message our team', 'https://wa.me/917004374250'),
      _moreTile(context, Icons.language, 'Website', 'www.eyepek.com', 'https://www.eyepek.com'),
      _moreTile(context, Icons.call_outlined, 'Call EYEPEK', '+91 70043 74250', 'tel:+917004374250'),
      _moreTile(context, Icons.privacy_tip_outlined, 'Privacy Policy', 'How your information is handled', 'https://www.eyepek.com/privacy-policy.html'),
      const SizedBox(height: 12), _notice(), const SizedBox(height: 16),
      Center(child: Text(_t("EYEPEK • Guidance that helps you move forward", "EYEPEK • आगे बढ़ने में मददगार मार्गदर्शन"), style: TextStyle(color: Colors.blueGrey, fontSize: 11))),
    ]),
  );
}
String _moreHindi(String english) => const {
  'WhatsApp': 'WhatsApp',
  'Message our team': 'हमारी टीम को संदेश भेजें',
  'Website': 'वेबसाइट',
  'www.eyepek.com': 'www.eyepek.com',
  'Call EYEPEK': 'EYEPEK को कॉल करें',
  '+91 70043 74250': '+91 70043 74250',
  'Privacy Policy': 'गोपनीयता नीति',
  'How your information is handled': 'आपकी जानकारी का उपयोग कैसे होता है',
}[english] ?? english;

Widget _moreTile(BuildContext context, IconData icon, String title, String subtitle, String url) => Card(
  elevation: 0, color: Colors.white, margin: const EdgeInsets.only(bottom: 9),
  child: ListTile(
    leading: CircleAvatar(backgroundColor: pale, child: Icon(icon, color: navy)),
    title: Text(_t(title, _moreHindi(title)), style: const TextStyle(fontWeight: FontWeight.w800, color: ink)),
    subtitle: Text(_t(subtitle, _moreHindi(subtitle)), style: const TextStyle(fontSize: 12)),
    trailing: const Icon(Icons.open_in_new, size: 17, color: blue),
    onTap: () => _launch(context, Uri.parse(url)),
  ),
);
Future<void> _openWhatsApp(BuildContext context, String message) =>
  _launch(context, Uri.https('wa.me', '/917004374250', {'text': message}));
Future<void> _launch(BuildContext context, Uri uri) async {
  final opened = await launchUrl(uri, mode: LaunchMode.externalApplication);
  if (!opened && context.mounted) {
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Could not open this link. Please try again.')));
  }
}
