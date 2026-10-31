import 'package:flutter/material.dart';

void main() => runApp(const EyepekApp());

class EyepekApp extends StatelessWidget {
  const EyepekApp({super.key});

  @override
  Widget build(BuildContext context) {
    const navy = Color(0xFF123D78);
    return MaterialApp(
      title: 'EYEPEK',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: navy, brightness: Brightness.light),
        scaffoldBackgroundColor: const Color(0xFFF6F8FC),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class ServiceItem {
  final String title;
  final String category;
  final IconData icon;
  const ServiceItem(this.title, this.category, this.icon);
}

const services = <ServiceItem>[
  ServiceItem('College Affiliation Support', 'College', Icons.account_balance),
  ServiceItem('Approval & Compliance', 'College', Icons.verified_user_outlined),
  ServiceItem('College Documentation', 'College', Icons.folder_copy_outlined),
  ServiceItem('Faculty Documentation', 'College', Icons.groups_outlined),
  ServiceItem('Admission Guidance', 'Student', Icons.school_outlined),
  ServiceItem('Course Information', 'Student', Icons.menu_book_outlined),
  ServiceItem('Exam & Result Guidance', 'Student', Icons.assignment_outlined),
  ServiceItem('Career Guidance', 'Student', Icons.work_outline),
  ServiceItem('Computer Courses', 'Computer', Icons.computer_outlined),
  ServiceItem('Programming Training', 'Computer', Icons.code),
  ServiceItem('Computer Repair', 'IT', Icons.build_outlined),
  ServiceItem('Windows & Software Installation', 'IT', Icons.laptop_windows),
  ServiceItem('Networking', 'IT', Icons.lan_outlined),
  ServiceItem('Printer Support', 'IT', Icons.print_outlined),
  ServiceItem('CCTV Installation', 'IT', Icons.videocam_outlined),
  ServiceItem('Server & Remote Support', 'IT', Icons.dns_outlined),
  ServiceItem('Annual Maintenance (AMC)', 'IT', Icons.settings_outlined),
  ServiceItem('Form Filling Assistance', 'Online Support', Icons.edit_document),
  ServiceItem('Printing & Scanning', 'Online Support', Icons.document_scanner_outlined),
  ServiceItem('Document Assistance', 'Online Support', Icons.description_outlined),
  ServiceItem('YouTube Learning Videos', 'Media', Icons.play_circle_outline),
  ServiceItem('Education Updates', 'Media', Icons.notifications_none),
];

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    const navy = Color(0xFF123D78);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: navy,
        foregroundColor: Colors.white,
        title: const Text('EYEPEK', style: TextStyle(fontWeight: FontWeight.w800, letterSpacing: 1.2)),
        actions: [IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_none))],
      ),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.fromLTRB(20, 24, 20, 26),
              decoration: const BoxDecoration(
                color: navy,
                borderRadius: BorderRadius.vertical(bottom: Radius.circular(26)),
              ),
              child: const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('One App. All Services.', style: TextStyle(color: Colors.white, fontSize: 25, fontWeight: FontWeight.bold)),
                SizedBox(height: 8),
                Text('College • Education • Students • Computer • IT', style: TextStyle(color: Color(0xFFDCE9FF), fontSize: 13)),
                SizedBox(height: 18),
                Text('Explore services and send an enquiry to EYEPEK.', style: TextStyle(color: Colors.white70)),
              ]),
            ),
          ),
          const SliverPadding(
            padding: EdgeInsets.fromLTRB(16, 22, 16, 8),
            sliver: SliverToBoxAdapter(child: Text('Our Services', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold))),
          ),
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(16, 4, 16, 24),
            sliver: SliverGrid.builder(
              itemCount: services.length,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, crossAxisSpacing: 12, mainAxisSpacing: 12, childAspectRatio: 1.35),
              itemBuilder: (context, index) {
                final item = services[index];
                return Card(
                  elevation: 0,
                  color: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: const BorderSide(color: Color(0xFFE4EAF3))),
                  child: InkWell(
                    borderRadius: BorderRadius.circular(16),
                    onTap: () => showModalBottomSheet<void>(
                      context: context,
                      showDragHandle: true,
                      builder: (context) => Padding(
                        padding: const EdgeInsets.all(24),
                        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Icon(item.icon, color: navy, size: 34),
                          const SizedBox(height: 12),
                          Text(item.title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 8),
                          Text('Category: ${item.category}'),
                          const SizedBox(height: 16),
                          const Text('Contact EYEPEK to enquire about this service.'),
                          const SizedBox(height: 18),
                          SizedBox(width: double.infinity, child: FilledButton(onPressed: () => Navigator.pop(context), child: const Text('Close'))),
                        ]),
                      ),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                        Icon(item.icon, color: navy, size: 27),
                        Text(item.title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                        Text(item.category, style: const TextStyle(color: Color(0xFF64748B), fontSize: 11)),
                      ]),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: NavigationBar(destinations: const [
        NavigationDestination(icon: Icon(Icons.home_outlined), label: 'Home'),
        NavigationDestination(icon: Icon(Icons.grid_view_outlined), label: 'Services'),
        NavigationDestination(icon: Icon(Icons.assignment_outlined), label: 'Enquiry'),
        NavigationDestination(icon: Icon(Icons.person_outline), label: 'Profile'),
      ], selectedIndex: 0, onDestinationSelected: (_) {}),
    );
  }
}
