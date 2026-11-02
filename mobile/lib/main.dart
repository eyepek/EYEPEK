import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main() => runApp(const EyepekApp());

const navy = Color(0xFF073B78);
const blue = Color(0xFF0865C8);
const pale = Color(0xFFEAF4FF);
const ink = Color(0xFF102B50);

class ServiceInfo {
  final String title, detail;
  final IconData icon;
  const ServiceInfo(this.title, this.detail, this.icon);
}
const services = <ServiceInfo>[
  ServiceInfo('Admission Guidance', 'Explore course options and get help understanding the admission process.', Icons.school),
  ServiceInfo('College Affiliation', 'Guidance for affiliation processes and required documentation.', Icons.account_balance),
  ServiceInfo('AICTE Documentation', 'Support organising applications, records and compliance documents.', Icons.verified_outlined),
  ServiceInfo('Documents & Compliance', 'Help preparing, checking and organising education related documents.', Icons.description_outlined),
  ServiceInfo('Renewals & Reporting', 'Guidance with periodic renewals, reporting and document preparation.', Icons.sync),
  ServiceInfo('Consultation', 'Speak with the EYEPEK team about your requirements.', Icons.support_agent),
  ServiceInfo('Computer & IT Support', 'Computer, software, networking, CCTV and maintenance support.', Icons.computer),
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
    home: const Shell(),
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
  const Shell({super.key});
  @override
  State<Shell> createState() => _ShellState();
}
class _ShellState extends State<Shell> {
  int tab = 0;
  void go(int value) => setState(() => tab = value);
  @override
  Widget build(BuildContext context) {
    final pages = [Home(go: go), ServicesPage(go: go), const CoursesPage(), const EnquiryPage(), const MorePage()];
    return Scaffold(
      body: IndexedStack(index: tab, children: pages),
      bottomNavigationBar: NavigationBar(
        selectedIndex: tab, onDestinationSelected: go,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.grid_view_outlined), selectedIcon: Icon(Icons.grid_view), label: 'Services'),
          NavigationDestination(icon: Icon(Icons.menu_book_outlined), selectedIcon: Icon(Icons.menu_book), label: 'Courses'),
          NavigationDestination(icon: Icon(Icons.chat_bubble_outline), selectedIcon: Icon(Icons.chat_bubble), label: 'Enquiry'),
          NavigationDestination(icon: Icon(Icons.more_horiz), label: 'More'),
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
    SliverAppBar(pinned: true, title: const Brand(), actions: [IconButton(tooltip: 'Contact EYEPEK', onPressed: () => go(4), icon: const Icon(Icons.call_outlined))]),
    SliverToBoxAdapter(child: Container(
      margin: const EdgeInsets.fromLTRB(16, 16, 16, 8), padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(borderRadius: BorderRadius.circular(24), gradient: const LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [navy, Color(0xFF0874D1)])),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          ClipRRect(borderRadius: BorderRadius.circular(13), child: Image.asset('assets/eyepek-app-icon.png', width: 48, height: 48)),
          const SizedBox(width: 10), const Text('EYEPEK', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 18, letterSpacing: 1)),
        ]),
        const SizedBox(height: 22),
        const Text('ADMISSIONS • AFFILIATION • DOCUMENTS', style: TextStyle(color: Color(0xFFFFC58A), fontSize: 10, letterSpacing: .7, fontWeight: FontWeight.bold)),
        const SizedBox(height: 10),
        const Text('Education guidance,\nmade clearer.', style: TextStyle(color: Colors.white, fontSize: 29, height: 1.15, fontWeight: FontWeight.w800)),
        const SizedBox(height: 10),
        const Text('Get practical guidance for college admissions, affiliation processes and AICTE related documentation.', style: TextStyle(color: Colors.white, height: 1.5)),
        const SizedBox(height: 18),
        FilledButton.icon(onPressed: () => go(3), style: FilledButton.styleFrom(backgroundColor: Colors.white, foregroundColor: navy), icon: const Icon(Icons.chat_outlined), label: const Text('Talk to our team')),
      ]),
    )),
    SliverToBoxAdapter(child: _heading('How EYEPEK can help', () => go(1))),
    SliverPadding(padding: const EdgeInsets.symmetric(horizontal: 16), sliver: SliverGrid.count(
      crossAxisCount: 2, crossAxisSpacing: 11, mainAxisSpacing: 11, childAspectRatio: 1.48,
      children: services.take(4).map((s) => _serviceTile(s, () => go(1))).toList(),
    )),
    SliverToBoxAdapter(child: _heading('Explore courses', () => go(2))),
    SliverToBoxAdapter(child: SizedBox(height: 108, child: ListView(
      scrollDirection: Axis.horizontal, padding: const EdgeInsets.symmetric(horizontal: 16),
      children: const [_CourseChip('BBA'), _CourseChip('BCA'), _CourseChip('MBA'), _CourseChip('MCA'), _CourseChip('ANM'), _CourseChip('GNM'), _CourseChip('B.Sc. Nursing')],
    ))),
    SliverToBoxAdapter(child: Padding(padding: const EdgeInsets.fromLTRB(16, 16, 16, 24), child: _notice())),
  ]);
}
Widget _heading(String title, VoidCallback tap) => Padding(
  padding: const EdgeInsets.fromLTRB(18, 20, 18, 12),
  child: Row(children: [Expanded(child: Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: ink))), TextButton(onPressed: tap, child: const Text('See all'))]),
);
Widget _serviceTile(ServiceInfo item, VoidCallback tap) => Material(
  color: Colors.white, borderRadius: BorderRadius.circular(17),
  child: InkWell(onTap: tap, borderRadius: BorderRadius.circular(17), child: Container(
    padding: const EdgeInsets.all(13),
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(17), border: Border.all(color: const Color(0xFFE5ECF4))),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.center, children: [
      CircleAvatar(radius: 19, backgroundColor: pale, child: Icon(item.icon, color: navy, size: 21)),
      const SizedBox(height: 9),
      Text(item.title, style: const TextStyle(color: ink, fontSize: 12, fontWeight: FontWeight.w800)),
      const SizedBox(height: 3), const Text('Learn more  ›', style: TextStyle(color: blue, fontSize: 10, fontWeight: FontWeight.w600)),
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
  child: const Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
    Icon(Icons.info_outline, color: Color(0xFF9A5A00), size: 19), SizedBox(width: 9),
    Expanded(child: Text('Course availability, eligibility and approvals are decided by the relevant institutions and authorities. EYEPEK provides guidance and documentation support.', style: TextStyle(color: ink, fontSize: 11, height: 1.45))),
  ]),
);

class ServicesPage extends StatelessWidget {
  final ValueChanged<int> go;
  const ServicesPage({super.key, required this.go});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Our Services', style: TextStyle(fontWeight: FontWeight.w800))),
    body: ListView(padding: const EdgeInsets.all(16), children: [
      const Text('Guidance and support, in the order people usually need it.', style: TextStyle(color: Colors.blueGrey)),
      const SizedBox(height: 14),
      for (final item in services)
        Card(elevation: 0, color: Colors.white, margin: const EdgeInsets.only(bottom: 10), child: ListTile(
          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 5),
          leading: CircleAvatar(backgroundColor: pale, child: Icon(item.icon, color: navy)),
          title: Text(item.title, style: const TextStyle(fontWeight: FontWeight.w800, color: ink, fontSize: 14)),
          subtitle: Padding(padding: const EdgeInsets.only(top: 4), child: Text(item.detail, style: const TextStyle(fontSize: 12, height: 1.35))),
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
      Text(item.title, style: const TextStyle(fontSize: 21, fontWeight: FontWeight.bold, color: ink)),
      const SizedBox(height: 8), Text(item.detail), const SizedBox(height: 18),
      FilledButton.icon(onPressed: () { Navigator.pop(sheet); enquire(); }, icon: const Icon(Icons.chat_outlined), label: const Text('Ask about this service')),
    ]),
  ),
);

class CoursesPage extends StatelessWidget {
  const CoursesPage({super.key});
  static const courses = [
    ('BBA', 'Business administration', 'Undergraduate'),
    ('BCA', 'Computer applications', 'Undergraduate'),
    ('ANM', 'Nursing', 'Undergraduate'),
    ('GNM', 'Nursing', 'Undergraduate'),
    ('B.Sc. Nursing', 'Nursing', 'Undergraduate'),
    ('MBA', 'Business administration', 'Postgraduate'),
    ('MCA', 'Computer applications', 'Postgraduate'),
  ];
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Explore Courses', style: TextStyle(fontWeight: FontWeight.w800))),
    body: ListView(padding: const EdgeInsets.all(16), children: [
      const Text('Tell us what you are interested in and we can guide you on available options.', style: TextStyle(color: Colors.blueGrey, height: 1.45)),
      const SizedBox(height: 14),
      for (final course in courses)
        Card(elevation: 0, color: Colors.white, margin: const EdgeInsets.only(bottom: 9), child: ListTile(
          leading: Container(width: 52, height: 52, decoration: BoxDecoration(color: pale, borderRadius: BorderRadius.circular(13)), child: const Icon(Icons.menu_book, color: navy)),
          title: Text(course.$1, style: const TextStyle(fontWeight: FontWeight.w800, color: ink)),
          subtitle: Text(course.$2 + ' • ' + course.$3),
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
        if (required && (value == null || value.trim().isEmpty)) return 'Please enter ' + label;
        if (keyboard == TextInputType.phone && value != null && value.trim().length < 10) return 'Please enter a valid phone number';
        return null;
      }),
    ]),
  );

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Talk to EYEPEK', style: TextStyle(fontWeight: FontWeight.w800))),
    body: Form(key: formKey, child: ListView(padding: const EdgeInsets.all(17), children: [
      Container(padding: const EdgeInsets.all(16), decoration: BoxDecoration(color: pale, borderRadius: BorderRadius.circular(17)), child: const Row(children: [
        Icon(Icons.chat_outlined, color: navy, size: 27), SizedBox(width: 11),
        Expanded(child: Text('Share a few details. WhatsApp will open with your message ready to send.', style: TextStyle(color: ink, fontSize: 13, height: 1.4))),
      ])),
      const SizedBox(height: 18),
      field('Name', name, hint: 'Your name', required: true),
      field('Mobile number', phone, hint: 'Your phone number', required: true, keyboard: TextInputType.phone),
      field('Email (optional)', email, hint: 'Your email address', keyboard: TextInputType.emailAddress),
      const Text('What do you need help with?', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: ink)),
      const SizedBox(height: 6),
      DropdownButtonFormField<String>(initialValue: service, isExpanded: true, items: services.map((s) => DropdownMenuItem(value: s.title, child: Text(s.title, overflow: TextOverflow.ellipsis))).toList(), onChanged: (value) { if (value != null) setState(() => service = value); }),
      const SizedBox(height: 13),
      field('Course or other details', interest, hint: 'For example: BCA, affiliation, document help'),
      const SizedBox(height: 5),
      SizedBox(height: 52, child: FilledButton.icon(onPressed: () {
        if (!formKey.currentState!.validate()) return;
        final message = 'Hello EYEPEK, I need help with: ' + service +
          '\nName: ' + name.text.trim() + '\nMobile: ' + phone.text.trim() +
          '\nEmail: ' + email.text.trim() + '\nDetails: ' + interest.text.trim();
        _openWhatsApp(context, message);
      }, icon: const Icon(Icons.send), label: const Text('Continue on WhatsApp'))),
      const SizedBox(height: 13),
      const Text('WhatsApp opens on your device. Review the message and press Send to contact us.', textAlign: TextAlign.center, style: TextStyle(color: Colors.blueGrey, fontSize: 11)),
    ])),
  );
}

class MorePage extends StatelessWidget {
  const MorePage({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Brand()),
    body: ListView(padding: const EdgeInsets.all(16), children: [
      Container(padding: const EdgeInsets.all(18), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)), child: const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('About EYEPEK', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: ink)),
        SizedBox(height: 8),
        Text('Education service and guidance for students and institutions, including admissions, college affiliation processes and document support.', style: TextStyle(height: 1.5, color: Colors.blueGrey)),
      ])),
      const SizedBox(height: 14),
      _moreTile(context, Icons.chat, 'WhatsApp', 'Message our team', 'https://wa.me/917004374250'),
      _moreTile(context, Icons.language, 'Website', 'www.eyepek.com', 'https://www.eyepek.com'),
      _moreTile(context, Icons.call_outlined, 'Call EYEPEK', '+91 70043 74250', 'tel:+917004374250'),
      _moreTile(context, Icons.privacy_tip_outlined, 'Privacy Policy', 'How your information is handled', 'https://www.eyepek.com/privacy-policy.html'),
      const SizedBox(height: 12), _notice(), const SizedBox(height: 16),
      const Center(child: Text('EYEPEK • Guidance that helps you move forward', style: TextStyle(color: Colors.blueGrey, fontSize: 11))),
    ]),
  );
}
Widget _moreTile(BuildContext context, IconData icon, String title, String subtitle, String url) => Card(
  elevation: 0, color: Colors.white, margin: const EdgeInsets.only(bottom: 9),
  child: ListTile(
    leading: CircleAvatar(backgroundColor: pale, child: Icon(icon, color: navy)),
    title: Text(title, style: const TextStyle(fontWeight: FontWeight.w800, color: ink)),
    subtitle: Text(subtitle, style: const TextStyle(fontSize: 12)),
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
