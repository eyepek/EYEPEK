import 'package:flutter/material.dart';

void main() => runApp(const EyepekApp());
const navy = Color(0xFF073B78);
const blue = Color(0xFF0865C8);
const pale = Color(0xFFEAF4FF);
const ink = Color(0xFF102B50);

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
    ),
    home: const Splash(),
  );
}

class Brand extends StatelessWidget {
  const Brand({super.key});
  @override
  Widget build(BuildContext context) => RichText(text: const TextSpan(style: TextStyle(fontSize: 30, fontWeight: FontWeight.w900), children: [
    TextSpan(text: 'E', style: TextStyle(color: Color(0xFFF47721))),
    TextSpan(text: 'YEPEK', style: TextStyle(color: navy)),
  ]));
}

class Splash extends StatefulWidget {
  const Splash({super.key});
  @override
  State<Splash> createState() => _SplashState();
}
class _SplashState extends State<Splash> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const Shell()));
    });
  }
  @override
  Widget build(BuildContext context) => Scaffold(
    body: Container(
      width: double.infinity,
      decoration: const BoxDecoration(gradient: LinearGradient(colors: [Color(0xFFD9ECFF), Colors.white, Color(0xFFB9DEFF)])),
      child: const Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Icon(Icons.school, size: 90, color: navy),
        SizedBox(height: 20),
        Brand(),
        Text('Education & Compliance Services', style: TextStyle(color: navy)),
        SizedBox(height: 30),
        Text('Your Partner for College Admission,\nAffiliation and Approvals', textAlign: TextAlign.center, style: TextStyle(color: ink, fontSize: 18, height: 1.5, fontWeight: FontWeight.w600)),
        SizedBox(height: 40),
        CircularProgressIndicator(color: blue),
      ]),
    ),
  );
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
    final pages = [Home(go: go), Services(go: go), const Courses(), const Enquiry(), Dashboard(go: go)];
    return Scaffold(
      body: IndexedStack(index: tab, children: pages),
      floatingActionButton: FloatingActionButton(backgroundColor: navy, foregroundColor: Colors.white, onPressed: () => go(3), child: const Icon(Icons.add)),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: NavigationBar(
        selectedIndex: tab,
        onDestinationSelected: go,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.grid_view), label: 'Services'),
          NavigationDestination(icon: Icon(Icons.menu_book), label: 'Courses'),
          NavigationDestination(icon: Icon(Icons.description_outlined), label: 'Enquiry'),
          NavigationDestination(icon: Icon(Icons.person_outline), label: 'Profile'),
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
    SliverAppBar(pinned: true, title: const Brand(), actions: [IconButton(onPressed: () => _info(context), icon: const Icon(Icons.notifications_none))]),
    SliverToBoxAdapter(child: Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(borderRadius: BorderRadius.circular(22), gradient: const LinearGradient(colors: [navy, Color(0xFF0874D1)])),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const Text('COLLEGE & EDUCATION SERVICES', style: TextStyle(color: Color(0xFFBBDFFF), fontSize: 11, letterSpacing: 1, fontWeight: FontWeight.bold)),
        const SizedBox(height: 12),
        const Text('College Admission\n& Affiliation\nMade Simple', style: TextStyle(color: Colors.white, fontSize: 26, height: 1.15, fontWeight: FontWeight.w800)),
        const SizedBox(height: 10),
        const Text('Guidance for AICTE, State Universities and regulatory compliance.', style: TextStyle(color: Colors.white)),
        const SizedBox(height: 18),
        FilledButton(onPressed: () => go(3), style: FilledButton.styleFrom(backgroundColor: Colors.white, foregroundColor: navy), child: const Text('Get Started →')),
      ]),
    )),
    SliverToBoxAdapter(child: _heading('Explore Services', () => go(1))),
    SliverPadding(padding: const EdgeInsets.symmetric(horizontal: 16), sliver: SliverGrid.count(
      crossAxisCount: 3, crossAxisSpacing: 10, mainAxisSpacing: 10, childAspectRatio: 1,
      children: [
        _tile(Icons.school, 'College\nAdmission', () => go(1)),
        _tile(Icons.account_balance, 'Affiliation\nSupport', () => go(1)),
        _tile(Icons.verified, 'AICTE\nApproval', () => go(1)),
        _tile(Icons.apartment, 'State\nUniversities', () => go(1)),
        _tile(Icons.description, 'Documentation', () => go(1)),
        _tile(Icons.groups, 'Consultation', () => go(1)),
      ],
    )),
    SliverToBoxAdapter(child: _heading('Popular Courses', () => go(2))),
    SliverToBoxAdapter(child: SizedBox(height: 140, child: ListView(scrollDirection: Axis.horizontal, padding: const EdgeInsets.symmetric(horizontal: 16), children: const [
      _MiniCourse('BBA', '3 Years'), _MiniCourse('BCA', '3 Years'), _MiniCourse('MBA', '2 Years'), _MiniCourse('MCA', '2 Years'),
    ]))),
    SliverToBoxAdapter(child: Padding(padding: const EdgeInsets.all(16), child: _help(() => go(3)))),
  ]);
}

Widget _heading(String title, VoidCallback tap) => Padding(
  padding: const EdgeInsets.fromLTRB(18, 22, 18, 12),
  child: Row(children: [Expanded(child: Text(title, style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w800, color: ink))), TextButton(onPressed: tap, child: const Text('View All'))]),
);
Widget _tile(IconData icon, String title, VoidCallback tap) => Material(
  color: Colors.white,
  borderRadius: BorderRadius.circular(15),
  child: InkWell(onTap: tap, borderRadius: BorderRadius.circular(15), child: Container(
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(15), border: Border.all(color: const Color(0xFFE5ECF4))),
    padding: const EdgeInsets.all(8),
    child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Icon(icon, color: navy, size: 29), const SizedBox(height: 8),
      Text(title, textAlign: TextAlign.center, style: const TextStyle(color: ink, fontSize: 11, fontWeight: FontWeight.w700)),
    ]),
  )),
);
class _MiniCourse extends StatelessWidget {
  final String code, duration;
  const _MiniCourse(this.code, this.duration);
  @override
  Widget build(BuildContext context) => Container(
    width: 135, margin: const EdgeInsets.only(right: 10), padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(15), border: Border.all(color: const Color(0xFFE5ECF4))),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const Expanded(child: Center(child: Icon(Icons.menu_book, color: navy, size: 42))),
      Text(code, style: const TextStyle(fontWeight: FontWeight.w800, color: navy)),
      Text(duration, style: const TextStyle(fontSize: 11, color: Colors.blueGrey)),
    ]),
  );
}
Widget _help(VoidCallback tap) => Container(
  padding: const EdgeInsets.all(16),
  decoration: BoxDecoration(color: const Color(0xFFDCEEFF), borderRadius: BorderRadius.circular(18)),
  child: Row(children: [
    const CircleAvatar(backgroundColor: Colors.white, child: Icon(Icons.support_agent, color: navy)),
    const SizedBox(width: 12),
    const Expanded(child: Text('Need Help?\nTalk to our EYEPEK team', style: TextStyle(color: ink, fontWeight: FontWeight.w600))),
    FilledButton(onPressed: tap, child: const Text('Contact Now')),
  ]),
);

class Services extends StatelessWidget {
  final ValueChanged<int> go;
  const Services({super.key, required this.go});
  static const data = [
    ('College Admission Support', 'Guidance for BBA, BCA, MBA, MCA and other courses', Icons.school),
    ('Affiliation Support', 'Guidance for State Universities (AKU, PPU, LNMU, etc.)', Icons.account_balance),
    ('AICTE Approval Support', 'New institute, course approval, extension and compliance assistance', Icons.verified),
    ('Compliance & Documentation', 'Preparation and organisation of required documents', Icons.description),
    ('Renewal & Compliance', 'Affiliation renewal, AICTE compliance and periodic reporting', Icons.sync),
    ('Consultation', 'Expert guidance and end-to-end support', Icons.groups),
    ('Computer & IT Support', 'Computer repair, software, networking, CCTV and AMC support', Icons.computer),
  ];
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Our Services')),
    body: ListView.separated(
      padding: const EdgeInsets.all(16), itemCount: data.length, separatorBuilder: (_, __) => const SizedBox(height: 10),
      itemBuilder: (context, i) {
        final item = data[i];
        return Card(elevation: 0, color: Colors.white, child: ListTile(
          leading: CircleAvatar(backgroundColor: pale, child: Icon(item.$3, color: navy)),
          title: Text(item.$1, style: const TextStyle(fontWeight: FontWeight.w800, color: ink, fontSize: 14)),
          subtitle: Text(item.$2, style: const TextStyle(fontSize: 12)),
          trailing: const Icon(Icons.chevron_right, color: blue),
          onTap: () => showModalBottomSheet<void>(context: context, showDragHandle: true, builder: (sheet) => Padding(
            padding: const EdgeInsets.all(22),
            child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
              Icon(item.$3, size: 40, color: navy), const SizedBox(height: 12),
              Text(item.$1, style: const TextStyle(fontSize: 21, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8), Text(item.$2), const SizedBox(height: 18),
              FilledButton(onPressed: () { Navigator.pop(sheet); go(3); }, child: const Text('Send Enquiry')),
            ]),
          )),
        ));
      },
    ),
  );
}

class Courses extends StatefulWidget {
  const Courses({super.key});
  @override
  State<Courses> createState() => _CoursesState();
}
class _CoursesState extends State<Courses> {
  bool pg = false;
  static const data = [
    ('BBA', 'Bachelor of Business Administration', '3 Years'),
    ('BCA', 'Bachelor of Computer Applications', '3 Years'),
    ('MBA', 'Master of Business Administration', '2 Years'),
    ('MCA', 'Master of Computer Applications', '2 Years'),
  ];
  @override
  Widget build(BuildContext context) {
    final visible = data.where((c) => pg ? c.$1 == 'MBA' || c.$1 == 'MCA' : c.$1 == 'BBA' || c.$1 == 'BCA').toList();
    return Scaffold(
      appBar: AppBar(title: const Text('Courses')),
      body: Column(children: [
        Padding(padding: const EdgeInsets.all(16), child: SegmentedButton<bool>(
          segments: const [ButtonSegment(value: false, label: Text('UG Courses')), ButtonSegment(value: true, label: Text('PG Courses'))],
          selected: {pg}, onSelectionChanged: (v) => setState(() => pg = v.first),
        )),
        Expanded(child: ListView(padding: const EdgeInsets.all(16), children: [
          for (final c in visible)
            Card(elevation: 0, color: Colors.white, child: ListTile(
              leading: Container(width: 65, height: 65, decoration: BoxDecoration(color: pale, borderRadius: BorderRadius.circular(12)), child: const Icon(Icons.school, color: navy, size: 34)),
              title: Text(c.$1, style: const TextStyle(fontWeight: FontWeight.w800)),
              subtitle: Text(c.$2 + '\n' + c.$3 + '\nAdmission Support →'),
              isThreeLine: true,
            )),
          const Card(child: ListTile(leading: Icon(Icons.apartment, color: navy), title: Text('Other Courses'), subtitle: Text('Ask us about other UG/PG courses.'))),
        ])),
      ]),
    );
  }
}

class Enquiry extends StatefulWidget {
  const Enquiry({super.key});
  @override
  State<Enquiry> createState() => _EnquiryState();
}
class _EnquiryState extends State<Enquiry> {
  final keyForm = GlobalKey<FormState>();
  final name = TextEditingController(), mobile = TextEditingController(), email = TextEditingController(), message = TextEditingController();
  String category = 'Admission', service = Services.data.first.$1, course = 'BBA';
  @override
  void dispose() { name.dispose(); mobile.dispose(); email.dispose(); message.dispose(); super.dispose(); }
  Widget field(String label, TextEditingController ctl, String hint, {bool required = false, bool phone = false, int lines = 1}) => Padding(
    padding: const EdgeInsets.only(bottom: 13),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: ink)),
      const SizedBox(height: 6),
      TextFormField(controller: ctl, keyboardType: phone ? TextInputType.phone : TextInputType.text, maxLines: lines,
        validator: (v) {
          if (required && (v == null || v.trim().isEmpty)) return 'This field is required';
          if (phone && (v == null || v.trim().length < 10)) return 'Enter a valid mobile number';
          return null;
        },
        decoration: InputDecoration(hintText: hint),
      ),
    ]),
  );
  Widget drop(String label, String value, List<String> values, ValueChanged<String?> changed) => Padding(
    padding: const EdgeInsets.only(bottom: 13),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
      const SizedBox(height: 6),
      DropdownButtonFormField<String>(initialValue: value, items: values.map((v) => DropdownMenuItem(value: v, child: Text(v, overflow: TextOverflow.ellipsis))).toList(), onChanged: changed),
    ]),
  );
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Enquiry / Apply')),
    body: Form(key: keyForm, child: ListView(padding: const EdgeInsets.all(17), children: [
      Wrap(spacing: 6, children: ['Admission', 'Affiliation', 'AICTE', 'Other'].map((v) => ChoiceChip(
        label: Text(v), selected: category == v,
        onSelected: (_) => setState(() {
          category = v;
          service = v == 'Admission' ? Services.data[0].$1 : v == 'Affiliation' ? Services.data[1].$1 : v == 'AICTE' ? Services.data[2].$1 : Services.data[5].$1;
        }),
      )).toList()),
      const SizedBox(height: 16),
      field('Full Name *', name, 'Enter your name', required: true),
      field('Mobile Number *', mobile, 'Enter mobile number', required: true, phone: true),
      field('Email Address', email, 'Enter email address'),
      drop('Select Service *', service, Services.data.map((x) => x.$1).toList(), (v) => setState(() => service = v!)),
      drop('Select Course', course, ['BBA', 'BCA', 'MBA', 'MCA'], (v) => setState(() => course = v!)),
      field('State / University', TextEditingController(), 'Enter State / University'),
      field('Message', message, 'Enter your message (optional)', lines: 4),
      const SizedBox(height: 10),
      SizedBox(height: 52, child: FilledButton(onPressed: () {
        if (keyForm.currentState!.validate()) {
          showDialog<void>(context: context, builder: (d) => AlertDialog(
            title: const Text('Enquiry form preview'),
            content: const Text('Secure server integration is needed to submit enquiries and show live application status.'),
            actions: [TextButton(onPressed: () => Navigator.pop(d), child: const Text('OK'))],
          ));
        }
      }, child: const Text('Submit Enquiry'))),
    ])),
  );
}

class Dashboard extends StatelessWidget {
  final ValueChanged<int> go;
  const Dashboard({super.key, required this.go});
  Widget stat(IconData icon, String title, String value) => Container(
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(15), border: Border.all(color: const Color(0xFFE5ECF4))),
    child: Row(children: [
      CircleAvatar(backgroundColor: pale, child: Icon(icon, color: blue)),
      const SizedBox(width: 8),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.center, children: [
        Text(title, style: const TextStyle(fontSize: 11, color: Colors.blueGrey)),
        Text(value, style: const TextStyle(fontSize: 21, fontWeight: FontWeight.w800, color: ink)),
      ])),
    ]),
  );
  Widget recent(String title, String date, String status, Color color) => Card(
    elevation: 0,
    child: ListTile(
      leading: const CircleAvatar(backgroundColor: pale, child: Icon(Icons.assignment, color: navy)),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
      subtitle: Text(date, style: const TextStyle(fontSize: 11)),
      trailing: Container(padding: const EdgeInsets.all(7), decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(18)), child: Text(status, style: const TextStyle(fontSize: 10))),
    ),
  );
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Brand(), actions: [
      IconButton(onPressed: () => _info(context), icon: const Icon(Icons.notifications_none)),
      const CircleAvatar(backgroundColor: pale, child: Icon(Icons.person, color: navy)),
      const SizedBox(width: 12),
    ]),
    body: ListView(padding: const EdgeInsets.all(16), children: [
      Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(borderRadius: BorderRadius.circular(18), gradient: const LinearGradient(colors: [blue, navy])),
        child: const Row(children: [
          CircleAvatar(radius: 29, backgroundColor: Colors.white, child: Icon(Icons.person, size: 34, color: blue)),
          SizedBox(width: 12),
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('Welcome', style: TextStyle(color: Colors.white70)),
            Text('EYEPEK User', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
          ]),
        ]),
      ),
      const SizedBox(height: 15),
      GridView.count(shrinkWrap: true, physics: const NeverScrollableScrollPhysics(), crossAxisCount: 2, crossAxisSpacing: 10, mainAxisSpacing: 10, childAspectRatio: 1.8, children: [
        stat(Icons.list_alt, 'My Enquiries', '3'),
        stat(Icons.description, 'My Applications', '2'),
        stat(Icons.bookmark_border, 'Saved Courses', '5'),
        stat(Icons.notifications, 'Notifications', '1'),
      ]),
      const SizedBox(height: 20),
      const Text('Recent Enquiries', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: ink)),
      recent('BBA Admission', '10 Oct 2026', 'Under Review', const Color(0xFFFFE9BE)),
      recent('Affiliation Support', '05 Oct 2026', 'In Process', const Color(0xFFD9E9FF)),
      recent('AICTE Approval', '01 Oct 2026', 'Pending', const Color(0xFFFFDFDF)),
      const SizedBox(height: 12),
      _help(() => go(3)),
    ]),
  );
}

void _info(BuildContext context) {
  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('This feature will be available after backend integration.')));
}
